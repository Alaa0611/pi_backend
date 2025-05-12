const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner"
  },
 description: String,
  coverImageUrl: String,
  videoUrl: String,
  price : Number,
  duration:Number
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
