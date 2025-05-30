const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    currentLesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
    status: { type: String, enum: ["in_progress", "completed"], default: "in_progress" },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Progress", progressSchema);
