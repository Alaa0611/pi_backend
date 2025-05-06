const mongoose = require("mongoose");

const QuestionSchema = require("./question");

const QuizSchema = new mongoose.Schema({
  title: String,
  description: String,
  questions: [QuestionSchema],
  passingScore: Number,
  type: { type: String, enum: ["quiz", "exam", "practice"] },
});

module.exports = mongoose.model("Quiz", QuizSchema);
