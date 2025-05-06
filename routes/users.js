const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController"); // Ensure this path is correct

// Create a new user
router.post('/', usersController.createUser);

// Get all users
router.get('/', usersController.getAllUsers);

// Get a single user by ID
router.get('/:id', usersController.getUserById);

// Update a user by ID
router.put('/:id', usersController.updateUser);

// Delete a user by ID
router.delete('/:id', usersController.deleteUser);

module.exports = router;
