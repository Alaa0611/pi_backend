const express = require('express');
const router = express.Router();
const Topic = require("../models/forum")
const forumCtrl = require('../controller/forumController');

/**
 * @swagger
 * tags:
 *   name: Forum
 *   description: Forum topic and messaging routes
 */

/**
 * @swagger
 * /forum:
 *   get:
 *     summary: Get all forum topics
 *     tags: [Forum]
 *     responses:
 *       200:
 *         description: A list of forum topics
 */
router.get('/', forumCtrl.getTopics);

/**
 * @swagger
 * /forum/{id}:
 *   get:
 *     summary: Get a specific forum topic by ID
 *     tags: [Forum]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The topic ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Forum topic retrieved
 *       404:
 *         description: Topic not found
 */
router.get('/:id', forumCtrl.getTopic);

/**
 * @swagger
 * /forum:
 *   post:
 *     summary: Create a new forum topic
 *     tags: [Forum]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Topic created successfully
 */
router.post('/', forumCtrl.createTopic);

/**
 * @swagger
 * /forum/{id}:
 *   delete:
 *     summary: Delete a forum topic by ID
 *     tags: [Forum]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The topic ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Topic deleted successfully
 *       404:
 *         description: Topic not found
 */
router.delete('/:id', forumCtrl.deleteTopic);

/**
 * @swagger
 * /forum/{id}/message:
 *   post:
 *     summary: Add a message to a forum topic
 *     tags: [Forum]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The topic ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message added to topic
 *       404:
 *         description: Topic not found
 */
router.post('/:id/message', forumCtrl.addMessage);

/**
 * @swagger
 * /forum/search:
 *   get:
 *     summary: Search forum topics by query
 *     tags: [Forum]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         description: Search term
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Matching topics found
 */
router.get('/search', forumCtrl.searchTopics);

// Like topic
router.post('/:id/like', async (req, res) => {
  try {
    const topic = await Topic.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.json(topic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:id/dislike', async (req, res) => {
  try {
    const topic = await Topic.findByIdAndUpdate(
      req.params.id,
      { $inc: { dislikes: 1 } },
      { new: true }
    );
    res.json(topic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
