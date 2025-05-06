const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user'); // Import user routes

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);


// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes); // Add user routes

app.listen(3000, () => console.log('Server running on port 3000'));