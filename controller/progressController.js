const Progress = require("../models/progress");

exports.saveProgress = async (req, res) => {
  try {
    const { user, course, currentLesson, status } = req.body;

    let progress = await Progress.findOne({ user, course });

    if (progress) {
      progress.currentLesson = currentLesson;
      progress.status = status;
      progress.lastUpdated = Date.now();
    } else {
      progress = new Progress({ user, course, currentLesson, status });
    }

    await progress.save();
    res.status(200).json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    const progress = await Progress.findOne({ user: userId, course: courseId }).populate("currentLesson");
    if (!progress) return res.status(404).json({ message: "Progression non trouvée" });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const { user, course, currentLesson, status } = req.body;

    let progress = await Progress.findOne({ user, course });

    if (progress) {
      progress.currentLesson = currentLesson;
      progress.status = status;
      progress.lastUpdated = Date.now();
      await progress.save();
      res.json(progress);
    } else {
      res.status(404).json({ message: "Progression non trouvée" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
