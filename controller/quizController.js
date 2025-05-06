const Quiz = require("../models/quiz");

exports.createQuiz = async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllQuizzes = async (req, res) => {
  try {
    
    const { search, sort } = req.query;

    const queryFilter = {};
    if (search) {
      queryFilter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    
    let sortOption = {};
    if (sort) {
      
      sort.split(",").forEach((item) => {
        const [field, order] = item.split(":");
        sortOption[field] = order === "desc" ? -1 : 1;
      });
    } else {
      
      sortOption = { createdAt: -1 };
    }

    
    const quizzes = await Quiz.find(queryFilter).sort(sortOption);
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: "Quiz non trouvé" });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!quiz) return res.status(404).json({ error: "Quiz non trouvé" });
    res.json(quiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).json({ error: "Quiz non trouvé" });
    res.json({ message: "Quiz supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
