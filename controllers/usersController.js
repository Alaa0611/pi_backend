const User = require('../models/user/user.model');
const bcrypt = require('bcryptjs');

exports.getAllUsers = async (req, res) => {
  // Logic to get all users
};

exports.getUserById = async (req, res) => {
  // Logic to get a user by ID
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json(user);
    return user; // Return the user for further use (e.g., sending email)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  // Logic to update a user by ID
};

exports.deleteUser = async (req, res) => {
  // Logic to delete a user by ID
};