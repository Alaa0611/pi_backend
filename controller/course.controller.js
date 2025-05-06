const Course = require("../models/course");
const Lesson = require("../models/lesson");
const sendEmail = require("../config/emailService");

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(200).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllCourses = async (req, res) => {
  const courses = await Course.find().populate("lessons");
  res.json(courses);
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
