const mongoose = require("mongoose");


const ReponseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
  answers: [
    {
      questionId: mongoose.Schema.Types.ObjectId,
      response: mongoose.Schema.Types.Mixed,
    },
  ],
  score: Number,
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Reponse", ReponseSchema);
