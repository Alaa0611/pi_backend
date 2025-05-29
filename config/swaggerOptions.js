const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "KnowQuest",
      version: "1.0.0",
      description: "Learning as an adventure.",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      schemas: {
        // Question Schema
        Question: {
          type: "object",
          properties: {
            type: { type: "string", example: "mcq" },
            question: {
              type: "string",
              example: "Quelle est la capitale de la France ?",
            },
            options: {
              type: "array",
              items: { type: "string", example: "Paris" },
            },
            correctAnswer: { type: "string", example: "Paris" },
          },
        },
        // Quiz Schema
        Quiz: {
          type: "object",
          required: ["title", "questions", "passingScore", "type"],
          properties: {
            _id: { type: "string" },
            title: { type: "string", example: "Quiz Node.js" },
            description: {
              type: "string",
              example: "Testez vos connaissances sur Node.js",
            },
            questions: {
              type: "array",
              items: { $ref: "#/components/schemas/Question" },
            },
            passingScore: { type: "number", example: 70 },
            type: {
              type: "string",
              enum: ["quiz", "exam", "practice"],
              example: "quiz",
            },
          },
        },
        // Quiz Attempt Schema
        QuizAttempt: {
          type: "object",
          properties: {
            _id: { type: "string" },
            student: { type: "string" },
            quiz: {
              type: "object",
              properties: {
                _id: { type: "string" },
                title: { type: "string" },
                passingScore: { type: "number" },
              },
            },
            totalQuestions: { type: "integer" },
            correctAnswers: { type: "integer" },
            totalMarks: { type: "number" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        // Quiz Attempt Submission Schema
        QuizAttemptSubmission: {
          type: "object",
          required: ["quizId", "answers"],
          properties: {
            quizId: { type: "string" },
            answers: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  questionId: { type: "string" },
                  selectedOption: { type: "string" },
                },
              },
            },
          },
        },
        // Certificate Schema
        Certificate: {
          type: "object",
          required: ["userId", "quizId", "score", "certificateId"],
          properties: {
            _id: { type: "string" },
            userId: { type: "string", example: "6412abc12345def67890abcd" },
            quizId: { type: "string", example: "6412abc98765fed43210abce" },
            score: { type: "number", example: 85 },
            certificateId: {
              type: "string",
              example: "2f56f3e6-9a83-4b28-bc92-e6bb1c7352c9",
            },
            issuedAt: {
              type: "string",
              format: "date-time",
              example: "2025-04-17T15:30:00Z",
            },
          },
        },
        // User Schema
        User: {
          type: "object",
          required: ["username", "email", "password", "role"],
          properties: {
            username: { type: "string" },
            email: { type: "string", format: "email" },
            password: { type: "string", minLength: 6 },
            role: {
              type: "string",
              enum: ["user", "admin"],
              description: "User's role",
            },
          },
        },
        // Admin Schema
        Admin: {
          type: "object",
          required: ["username", "email", "password", "role"],
          properties: {
            username: { type: "string" },
            email: { type: "string", format: "email" },
            password: { type: "string", minLength: 6 },
            role: { type: "string", enum: ["admin"] },
          },
        },
        // Course Schema
        Course: {
          type: "object",
          required: ["title", "description", "author", "category", "tags"],
          properties: {
            _id: { type: "string" },
            title: { type: "string", example: "Learn Node.js" },
            description: {
              type: "string",
              example: "Master Node.js from scratch.",
            },
            author: { type: "string", example: "John Doe" },
            category: { type: "string", example: "Development" },
            tags: {
              type: "array",
              items: { type: "string", example: "node, javascript" },
            },
          },
        },
        // Lesson Schema
        Lesson: {
          type: "object",
          required: ["courseId", "title", "content"],
          properties: {
            _id: { type: "string" },
            courseId: { type: "string" },
            title: { type: "string", example: "Introduction to Node.js" },
            content: {
              type: "string",
              example: "This lesson covers the basics of Node.js.",
            },
          },
        },
        // Forum Schema
        ForumTopic: {
          type: "object",
          required: ["title", "content", "author"],
          properties: {
            title: { type: "string", example: "Node.js Discussion" },
            content: {
              type: "string",
              example: "Let's discuss the best practices in Node.js.",
            },
            author: { type: "ObjectId", example: "031065061351" },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"], // Path to your route files for documentation
};

module.exports = swaggerJsDoc(options);
