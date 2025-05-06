const express = require("express");
const router = express.Router();
const certifCtrl = require("../controller/certifController");

/**
 * @swagger
 * tags:
 *   name: Certificates
 *   description: Génération et vérification des certificats
 */

/**
 * @swagger
 * /certif/generate:
 *   post:
 *     summary: Générer un certificat et le télécharger
 *     tags: [Certificates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - quizId
 *               - score
 *               - userName
 *             properties:
 *               userId:
 *                 type: string
 *               quizId:
 *                 type: string
 *               score:
 *                 type: number
 *               userName:
 *                 type: string
 *             example:
 *               userId: "6412abc12345def67890abcd"
 *               quizId: "6412abc98765fed43210abce"
 *               score: 88
 *               userName: "John Doe"
 *     responses:
 *       200:
 *         description: Téléchargement automatique du PDF du certificat
 */
router.post("/generate", certifCtrl.generateCertificate);

/**
 * @swagger
 * /certif/verify/{certificateId}:
 *   get:
 *     summary: Vérifier l’authenticité d’un certificat
 *     tags: [Certificates]
 *     parameters:
 *       - in: path
 *         name: certificateId
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID du certificat
 *     responses:
 *       200:
 *         description: Détails du certificat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Certificate'
 *       404:
 *         description: Certificat introuvable
 */
router.get("/verify/:certificateId", certifCtrl.verifyCertificate);

module.exports = router;
