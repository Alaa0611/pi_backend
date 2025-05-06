const Certificate = require("../models/certficats");
const { v4: uuidv4 } = require("uuid");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

exports.generateCertificate = async (req, res) => {
  try {
    
    const { userId, quizId, score, userName } = req.body;
    const certificateId = uuidv4();

    const certificate = new Certificate({
      userId,
      quizId,
      score,
      certificateId,
      userName ,
    });

    await certificate.save();

   
    const certDir = path.join(__dirname, "../certificates");
    if (!fs.existsSync(certDir)) {
      fs.mkdirSync(certDir);
    }

    const certPath = path.join(certDir, `${certificateId}.pdf`);
    const doc = new PDFDocument({
      size: "A4",
      layout: "landscape",
      margins: { top: 50, bottom: 50, left: 72, right: 72 },
    });
    const writeStream = fs.createWriteStream(certPath);
    doc.pipe(writeStream);

    
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;
    const margin = 20;
    doc.lineWidth(4);
    doc
      .rect(margin, margin, pageWidth - margin * 2, pageHeight - margin * 2)
      .stroke("#000080");

    // Optionally add a logo if available
    const logoPath = path.join(__dirname, "../assets/logo.png");
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, pageWidth / 2 - 50, 30, { width: 100 });
    }

    
    doc
      .font("Times-Bold")
      .fontSize(36)
      .fillColor("#000080")
      .text("CERTIFICAT DE RÉUSSITE", { align: "center", underline: true });

    doc.moveDown(2);

    
    doc
      .font("Times-Roman")
      .fontSize(20)
      .fillColor("#333333")
      .text("Ce certificat est décerné à", { align: "center" });

    doc.moveDown();
    doc
      .font("Helvetica-Bold")
      .fontSize(28)
      .fillColor("#000000")
      .text(userName, { align: "center" });

    doc.moveDown();
    doc
      .font("Times-Roman")
      .fontSize(20)
      .fillColor("#333333")
      .text("pour avoir réussi le quiz/examen avec un score de", {
        align: "center",
      });

    doc.moveDown();
    doc
      .font("Helvetica-Bold")
      .fontSize(26)
      .fillColor("#000000")
      .text(`${score}`, { align: "center" });

    
    doc.moveDown(2);
    doc
      .font("Times-Italic")
      .fontSize(16)
      .fillColor("#555555")
      .text(`Quiz ID: ${quizId}`, { align: "center" });
    doc.moveDown();
    doc.text(`Certificat ID: ${certificateId}`, { align: "center" });
    doc.moveDown();
    doc.text(`Date: ${new Date().toLocaleDateString()}`, { align: "center" });

    doc.moveDown(4);
    doc
      .font("Times-Bold")
      .fontSize(18)
      .fillColor("#000080")
      .text("Signature de l'administrateur", { align: "right" });
    doc.moveDown();
    doc.lineWidth(1);
    doc
      .moveTo(pageWidth - 250, doc.y)
      .lineTo(pageWidth - 50, doc.y)
      .stroke("#000080");

    doc.end();

    writeStream.on("finish", () => {
      res.download(certPath, `${certificateId}.pdf`);
    });

    writeStream.on("error", (err) => {
      console.error("Erreur d'écriture PDF :", err);
      if (!res.headersSent) {
        res
          .status(500)
          .json({ error: "Erreur lors de la création du certificat." });
      }
    });
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
    }
  }
};

exports.verifyCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;
    const cert = await Certificate.findOne({ certificateId }).populate(
      "userId quizId"
    );

    if (!cert) {
      return res.status(404).json({ message: "Certificat introuvable" });
    }

    res.status(200).json(cert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
