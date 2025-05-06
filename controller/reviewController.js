const Review = require("../models/review");
const mongoose = require("mongoose");

exports.addReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(200).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCourseReviews = async (req, res) => {
  try {
    const { courseId } = req.params;
    const reviews = await Review.find({ course: courseId })
    .sort({ createdAt: -1 });
      res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getAverageRating = async (req, res) => {
    try {
      const { courseId } = req.params;
      const result = await Review.aggregate([
        { $match: { course: new mongoose.Types.ObjectId(courseId) } },
        { $group: { _id: "$course", average: { $avg: "$rating" }, count: { $sum: 1 } } },
      ]);
      if (result.length === 0) return res.json({ average: 0, count: 0 });
      res.json(result[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };