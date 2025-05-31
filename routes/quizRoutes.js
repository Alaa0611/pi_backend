const express = require("express");
const router = express.Router();
const quizController = require("../controller/quizController");
const authMiddleware = require("../middll/auth"); // Import authentication middleware
 
/**
* @swagger
* components:
*   schemas:
*     Quiz:
*       type: object
*       required:
*         - title
*         - category
*         - duration
*         - questions
*       properties:
*         title:
*           type: string
*         description:
*           type: string
*         category:
*           type: string
*         questions:
*           type: array
*           items:
*             $ref: '#/components/schemas/QuizQuestion'
*         duration:
*           type: number
*         img:
*           type: string
*         status:
*           type: string
*           enum: [draft, published, archived]
*           default: draft
*         createdBy:
*           type: string
*       example:
*         title: "JavaScript Basics"
*         description: "Test your JavaScript knowledge"
*         category: "Programming"
*         duration: 30
*         img: "https://example.com/js-quiz.jpg"
*         status: "published"
*         createdBy: "instructor123"
*         questions: 
*           - questionText: "What is hoisting in JavaScript?"
*             options: ["Variable declaration behavior", "Function optimization", "Memory allocation"]
*             correctAnswer: "Variable declaration behavior"
*             points: 10
*             explanation: "Hoisting is JavaScript's behavior of moving declarations to the top"
* 
*     QuizQuestion:
*       type: object
*       required:
*         - questionText
*         - options
*         - correctAnswer
*         - points
*       properties:
*         questionText:
*           type: string
*         options:
*           type: array
*           items:
*             type: string
*         correctAnswer:
*           type: string
*         points:
*           type: number
*         explanation:
*           type: string
*/
 
/**
* @swagger
* tags:
*   name: Quizzes
*   description: Gestion des quizzes
*/
 
/**
* @swagger
* /quizzes:
*   post:
*     summary: Créer un nouveau quiz
*     tags: [Quizzes]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Quiz'
*     responses:
*       201:
*         description: Quiz créé avec succès
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Quiz'
*       400:
*         description: Données invalides
*       401:
*         description: Non autorisé
*/
router.post("/", authMiddleware, quizController.createQuiz);
 
/**
* @swagger
* /quizzes:
*   get:
*     summary: Récupérer la liste de tous les quizzes
*     tags: [Quizzes]
*     parameters:
*       - in: query
*         name: search
*         schema:
*           type: string
*         description: Terme de recherche sur le titre/description/catégorie
*       - in: query
*         name: sort
*         schema:
*           type: string
*         description: "Option de tri (ex : title:asc,duration:desc)"
*       - in: query
*         name: status
*         schema:
*           type: string
*         description: "Filtrer par statut (draft, published, archived)"
*     responses:
*       200:
*         description: Liste des quizzes
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Quiz'
*/
router.get("/", quizController.getAllQuizzes);
 
/**
* @swagger
* /quizzes/{id}:
*   get:
*     summary: Récupérer un quiz par son ID
*     tags: [Quizzes]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID du quiz
*     responses:
*       200:
*         description: Détails du quiz
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Quiz'
*       404:
*         description: Quiz non trouvé
*/
router.get("/:id", quizController.getQuizById);
 
/**
* @swagger
* /quizzes/{id}:
*   put:
*     summary: Mettre à jour un quiz existant
*     tags: [Quizzes]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID du quiz à mettre à jour
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Quiz'
*     responses:
*       200:
*         description: Quiz mis à jour
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Quiz'
*       400:
*         description: Données invalides
*       401:
*         description: Non autorisé
*       404:
*         description: Quiz non trouvé
*/
router.put("/:id", authMiddleware, quizController.updateQuiz);
 
/**
* @swagger
* /quizzes/{id}:
*   delete:
*     summary: Supprimer un quiz
*     tags: [Quizzes]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID du quiz à supprimer
*     responses:
*       200:
*         description: Quiz supprimé avec succès
*       401:
*         description: Non autorisé
*       404:
*         description: Quiz non trouvé
*/
router.delete("/:id", authMiddleware, quizController.deleteQuiz);
 
module.exports = router;