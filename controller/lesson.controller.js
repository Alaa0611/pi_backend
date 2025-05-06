const Lesson = require("../models/lesson");
const sendEmail = require("../config/emailService");
const User = require('../models/user'); 
exports.createLesson = async (req, res) => {
    try {
      // Create the new lesson from the request body
      const lesson = await Lesson.create(req.body);
  
      // Fetch users to notify (you may want to filter users based on specific criteria)
      const usersToNotify = await User.find();
  
      // Prepare email sending promises
      const emailPromises = usersToNotify.map((user) => {
        return sendEmail(
          user.email,
          "New lesson added to your course",
          `A new lesson has been added to your course: ${lesson.title}`
        );
      });
  
      // Wait for all email sending operations to complete
      await Promise.all(emailPromises);
  
      // After all emails have been sent, respond with the created lesson
      res.status(200).json(lesson);
    } catch (err) {
      // Handle any errors and send a response
      res.status(400).json({ error: err.message });
    }
  };

exports.getAllLessons = async (req, res) => {
  const lessons = await Lesson.find().populate("courseId");
  res.json(lessons);
};

exports.getLessonById = async (req, res) => {
  const lesson = await Lesson.findById(req.params.id).populate("courseId");
  if (!lesson) return res.status(404).json({ error: "Lesson not found" });
  res.json(lesson);
};

exports.updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(lesson);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteLesson = async (req, res) => {
  await Lesson.findByIdAndDelete(req.params.id);
  res.status(200).send();
};
