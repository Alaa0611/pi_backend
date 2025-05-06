const express = require("express");
const router = express.Router();
const quizController = require("../controller/quizController");

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
 */
router.post("/", quizController.createQuiz);

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
 *         description: Terme de recherche sur le titre/description
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: "Option de tri (ex : title:asc,passingScore:desc)"
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
 *       404:
 *         description: Quiz non trouvé
 */
router.put("/:id", quizController.updateQuiz);

/**
 * @swagger
 * /quizzes/{id}:
 *   delete:
 *     summary: Supprimer un quiz
 *     tags: [Quizzes]
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
 *       404:
 *         description: Quiz non trouvé
 */
router.delete("/:id", quizController.deleteQuiz);

module.exports = router;
