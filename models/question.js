const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  type: String, 
  question: String,
  options: [String],
  correctAnswer: mongoose.Schema.Types.Mixed,
});

module.exports = QuestionSchema;
