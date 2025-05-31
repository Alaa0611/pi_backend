const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  questionText: String,
  options: [String],
  correctAnswer: String,
  points: Number, // Changed from String to Number
  explanation: String
});

module.exports = QuestionSchema;
