const express = require("express");
const router = express.Router();
const { saveProgress, getUserProgress, updateProgress } = require("../controller/progressController");

/**
 * @swagger
 * tags:
 *   name: Progress
 *   description: Track user progress in courses
 */

/**
 * @swagger
 * /progress:
 *   post:
 *     summary: Save user progress for a course
 *     tags: [Progress]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - courseId
 *               - progress
 *             properties:
 *               userId:
 *                 type: string
 *               courseId:
 *                 type: string
 *               progress:
 *                 type: number
 *                 format: float
 *                 description: Progress value (e.g., percentage)
 *     responses:
 *       201:
 *         description: Progress saved successfully
 */
router.post("/", saveProgress);

/**
 * @swagger
 * /progress/{userId}/{courseId}:
 *   get:
 *     summary: Get user progress for a specific course
 *     tags: [Progress]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course
 *     responses:
 *       200:
 *         description: User progress data retrieved
 *       404:
 *         description: Progress not found
 */
router.get("/:userId/:courseId", getUserProgress);

/**
 * @swagger
 * /progress:
 *   put:
 *     summary: Update user progress for a course
 *     tags: [Progress]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - courseId
 *               - progress
 *             properties:
 *               userId:
 *                 type: string
 *               courseId:
 *                 type: string
 *               progress:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Progress updated successfully
 *       404:
 *         description: Progress record not found
 */
router.put("/", updateProgress);

module.exports = router;
