const mongoose = require("mongoose");

const QuestionSchema = require("./question");

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  questions: [QuestionSchema],
  duration: Number, // Changed from String to Number
  img: String,
  status: {type: String,enum: ["draft", "published", "archived"],default: "draft"},
  createdBy: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }}, { timestamps: true });

module.exports = mongoose.model("Quiz", QuizSchema);
