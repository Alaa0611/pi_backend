const QuizAttempt = require("../models/quizAttempt");
const Quiz = require("../models/quiz");

exports.getQuizAttempts = async (req, res) => {
  try {
    const studentId = req.user.id; // Get student ID from authenticated user
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const attempts = await QuizAttempt.find({ student: studentId })
      .populate("quiz", "title passingScore")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await QuizAttempt.countDocuments({ student: studentId });

    res.json({
      data: attempts,
      total,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQuizAttemptDetails = async (req, res) => {
  try {
    const attemptId = req.params.id;
    const studentId = req.user.id; // Get student ID from authenticated user

    const attempt = await QuizAttempt.findOne({
      _id: attemptId,
      student: studentId,
    }).populate("quiz", "title passingScore");

    if (!attempt) {
      return res.status(404).json({ error: "Attempt not found" });
    }

    res.json(attempt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.submitQuizAttempt = async (req, res) => {
  try {
    const studentId = req.user.id; // Get student ID from authenticated user
    const { quizId, answers } = req.body;

    // Find the quiz
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    // Calculate results
    let correctAnswers = 0;
    const results = quiz.questions.map((question) => {
      const userAnswer = answers.find((a) => a.questionId === question.id);
      const isCorrect =
        userAnswer && userAnswer.selectedOption === question.correctAnswer;

      if (isCorrect) correctAnswers++;

      return {
        questionId: question.id,
        selectedOption: userAnswer ? userAnswer.selectedOption : null,
        isCorrect,
        correctAnswer: question.correctAnswer,
      };
    });

    // Create quiz attempt
    const attempt = new QuizAttempt({
      student: studentId,
      quiz: quizId,
      totalQuestions: quiz.questions.length,
      correctAnswers,
      totalMarks: correctAnswers,
      answers: results,
    });

    await attempt.save();

    res.status(201).json(attempt);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getQuizAttemptsForInstructor = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const attempts = await QuizAttempt.find()
      .populate("student", "name email") // Add student population
      .populate("quiz", "title passingScore")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await QuizAttempt.countDocuments();

    res.json({
      data: attempts,
      total,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
