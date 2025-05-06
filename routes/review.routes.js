const express = require("express");
const router = express.Router();
const { addReview, getCourseReviews, getAverageRating } = require("../controller/reviewController");

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Course review and rating management
 */

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Add a review for a course
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseId
 *               - rating
 *               - review
 *             properties:
 *               courseId:
 *                 type: string
 *               rating:
 *                 type: integer
 *                 description: Rating between 1 and 5
 *                 minimum: 1
 *                 maximum: 5
 *               review:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review added successfully
 */
router.post("/", addReview);

/**
 * @swagger
 * /reviews/{courseId}:
 *   get:
 *     summary: Get all reviews for a course
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID to get reviews for
 *     responses:
 *       200:
 *         description: List of reviews for the course
 */
router.get("/:courseId", getCourseReviews);

/**
 * @swagger
 * /reviews/{courseId}/average:
 *   get:
 *     summary: Get the average rating for a course
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID to calculate the average rating for
 *     responses:
 *       200:
 *         description: Average rating for the course
 *       404:
 *         description: Course not found or no reviews
 */
router.get("/:courseId/average", getAverageRating);

module.exports = router;
