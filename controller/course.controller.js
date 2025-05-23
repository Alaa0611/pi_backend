const Course = require("../models/course");
const Lesson = require("../models/lesson");
const sendEmail = require("../config/emailService");

const upload = require('../middlewares/upload');
const path = require('path');

exports.createCourse = async (req, res) => {
  try {
    console.log('Uploaded file:', req.file);
    console.log('Course:', req.body.course);

    if (!req.body.course) {
      if (req.file) {
        const fs = require('fs');
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ error: 'Course data is required' });
    }

    let courseData;
    try {
      courseData = JSON.parse(req.body.course);
    } catch (err) {
      if (req.file) {
        const fs = require('fs');
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ 
        error: 'Invalid course JSON format',
        details: err.message
      });
    }

    if (!courseData.title || !courseData.level) {
      if (req.file) {
        const fs = require('fs');
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ error: 'Title and level are required' });
    }

    if (req.file) {
      courseData.coverImageUrl = `/uploads/course-covers/${req.file.filename}`;
    }

    const course = await Course.create(courseData);
    
    if (courseData.lessons && courseData.lessons.length > 0) {
      const lessonsWithCourseId = courseData.lessons.map((lesson, index) => ({
        title: lesson.title,
        content: lesson.content || '',
        videoUrl: lesson.videoUrl || '',
        order: lesson.order || index + 1,
        courseId: course._id
      }));
      
      await Lesson.insertMany(lessonsWithCourseId);
    }

    const createdLessons = await Lesson.find({ courseId: course._id })
      .sort({ order: 1 });

    res.status(201).json({
      ...course.toObject(),
      lessons: createdLessons
    });

  } catch (err) {
    console.error('Error creating course:', err);
    
    if (req.file) {
      const fs = require('fs');
      fs.unlinkSync(req.file.path);
    }

    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(el => el.message);
      return res.status(400).json({ 
        error: 'Validation error',
        details: errors 
      });
    }

    res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

exports.serveCourseCover = async (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join('../images', filename);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.sendFile(filePath);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAllCourses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const filter = {};
    if (req.query.level) {
      filter.level = req.query.level;
    }
    if (req.query.search) {
      filter.title = { $regex: req.query.search, $options: 'i' };
    }

    const total = await Course.countDocuments(filter);

    const courses = await Course.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const courseIds = courses.map(course => course._id);
    const lessonsByCourse = await Lesson.aggregate([
      {
        $match: {
          courseId: { $in: courseIds }
        }
      },
      {
        $group: {
          _id: "$courseId",
          lessons: { $push: "$$ROOT" },
          count: { $sum: 1 }
        }
      }
    ]);

    const lessonsMap = new Map();
    lessonsByCourse.forEach(item => {
      lessonsMap.set(item._id.toString(), {
        lessons: item.lessons,
        count: item.count
      });
    });

    const transformedCourses = courses.map(course => {
      const courseLessons = lessonsMap.get(course._id.toString()) || { lessons: [], count: 0 };
      return {
        ...course,
        lessons: courseLessons.lessons,
        lessonCount: courseLessons.count
      };
    });

    res.json({
      success: true,
      data: transformedCourses,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      }
    });

  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch courses',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};
exports.getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ error: "Course not found" });
  res.json(course);
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.status(200).send();
};
