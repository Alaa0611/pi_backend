const mongoose = require("mongoose");

const CertificateSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  score: { type: Number, required: true },
  certificateId: { type: String, required: true, unique: true },
  issuedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Certificate", CertificateSchema);
