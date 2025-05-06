const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner"
  },
  published: {
    type: Boolean,
    default: false
  },
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }]

}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
