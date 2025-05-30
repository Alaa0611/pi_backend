const express = require("express");
const router = express.Router();
const quizAttemptController = require("../controller/quizAttemptController");
const auth = require("../middll/auth"); 

/**
 * @swagger
 * tags:
 *   name: Quiz Attempts
 *   description: Gestion des tentatives de quiz
 */

/**
 * @swagger
 * /api/quizAttempt:
 *   get:
 *     summary: Récupérer les tentatives de quiz de l'étudiant connecté
 *     tags: [Quiz Attempts]
 *    
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Numéro de page
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Nombre d'éléments par page
 *     responses:
 *       200:
 *         description: Liste paginée des tentatives
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/QuizAttempt'
 *                 total:
 *                   type: integer
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur serveur
 */
router.get("/", auth, quizAttemptController.getQuizAttempts);

/**
 * @swagger
 * /api/quizAttempt/{id}:
 *   get:
 *     summary: Obtenir les détails d'une tentative de quiz
 *     tags: [Quiz Attempts]
 *     
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tentative
 *     responses:
 *       200:
 *         description: Détails de la tentative
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuizAttempt'
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Tentative non trouvée
 */
router.get("/:id", auth, quizAttemptController.getQuizAttemptDetails);

/**
 * @swagger
 * /api/quizAttempt:
 *   post:
 *     summary: Soumettre une nouvelle tentative de quiz
 *     tags: [Quiz Attempts]
 *     
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuizAttemptSubmission'
 *     responses:
 *       201:
 *         description: Tentative soumise avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuizAttempt'
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 */
router.post("/", auth, quizAttemptController.submitQuizAttempt);

// Add this new route below your existing routes
/**
 * @swagger
 * /api/quizAttempt/instructor:
 *   get:
 *     summary: Get all quiz attempts for instructors
 *     tags: [Quiz Attempts]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *     responses:
 *       200:
 *         description: List of all quiz attempts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/QuizAttempt'
 *                 total:
 *                   type: integer
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/instructor", auth, quizAttemptController.getQuizAttemptsForInstructor);
module.exports = router;
