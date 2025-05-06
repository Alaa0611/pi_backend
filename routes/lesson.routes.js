const express = require("express");
const router = express.Router();
const controller = require("../controller/lesson.controller");
const validate = require("../middll/validate");
const lessonSchema = require("../middll/lesson.validation");

/**
 * @swagger
 * tags:
 *   name: Lessons
 *   description: Lesson management
 */

/**
 * @swagger
 * /lessons:
 *   post:
 *     summary: Create a new lesson
 *     tags: [Lessons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lesson'
 *     responses:
 *       201:
 *         description: Lesson created successfully
 */
router.post("/", validate(lessonSchema), controller.createLesson);

/**
 * @swagger
 * /lessons:
 *   get:
 *     summary: Get all lessons
 *     tags: [Lessons]
 *     responses:
 *       200:
 *         description: List of all lessons
 */
router.get("/", controller.getAllLessons);

/**
 * @swagger
 * /lessons/{id}:
 *   get:
 *     summary: Get lesson by ID
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The lesson ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lesson found
 *       404:
 *         description: Lesson not found
 */
router.get("/:id", controller.getLessonById);

/**
 * @swagger
 * /lessons/{id}:
 *   put:
 *     summary: Update a lesson by ID
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The lesson ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lesson'
 *     responses:
 *       200:
 *         description: Lesson updated successfully
 *       404:
 *         description: Lesson not found
 */
router.put("/:id", validate(lessonSchema), controller.updateLesson);

/**
 * @swagger
 * /lessons/{id}:
 *   delete:
 *     summary: Delete a lesson by ID
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The lesson ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lesson deleted successfully
 *       404:
 *         description: Lesson not found
 */
router.delete("/:id", controller.deleteLesson);

module.exports = router;
