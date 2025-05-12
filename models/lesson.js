const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  videoUrl: String,
  order: Number,
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Lesson", lessonSchema);
