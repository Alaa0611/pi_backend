const express = require('express');
const http = require('http');
const path = require('path')
const socketio = require('socket.io');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const forumRoutes = require('./routes/forum');
const categoryRoutes = require('./routes/category');
const authRoutes = require('./routes/auth');
const { initSocket } = require('./socket/socket');
const notificationRoutes = require('./routes/notification');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin/adminRoutes');
const uploadRoute = require('./routes/upload');
const bodyParser = require('body-parser');
const courseRouter = require("./routes/course.routes");
const lessonRouter = require("./routes/lesson.routes");
const reviewRouter = require("./routes/review.routes");
const progressRouter = require("./routes/progress.routes");
const quizRouter = require("./routes/quizRoutes");
const certifRouter = require("./routes/certifRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swaggerOptions");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: { origin: '*' }
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

connectDB();

// Routes
app.use('/api/forum', forumRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoute);
app.use("/api/courses", courseRouter);
app.use("/api/lessons", lessonRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/progress", progressRouter);
app.use("/api/quizzes", quizRouter);
app.use("/api/certif", certifRouter);
app.use("/certificates", express.static(path.join(__dirname, "certificates")));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use((req, res, next) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

// Socket.io
initSocket(io);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
