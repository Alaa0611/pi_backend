const express = require('express');
const router = express.Router();
const catCtrl = require('../controller/categoryController');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category and Tag management
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of categories
 */
router.get('/', catCtrl.getCategories);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 */
router.post('/', catCtrl.createCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
router.delete('/:id', catCtrl.deleteCategory);

/**
 * @swagger
 * /categories/tags:
 *   get:
 *     summary: Get all tags
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of tags
 */
router.get('/tags', catCtrl.getTags);

/**
 * @swagger
 * /categories/tags/add:
 *   post:
 *     summary: Create a new tag
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tag created successfully
 */
router.post('/tags/add', catCtrl.createTag);

/**
 * @swagger
 * /categories/tags/{id}:
 *   delete:
 *     summary: Delete a tag by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The tag ID
 *     responses:
 *       200:
 *         description: Tag deleted successfully
 *       404:
 *         description: Tag not found
 */
router.delete('/tags/:id', catCtrl.deleteTag);

module.exports = router;
