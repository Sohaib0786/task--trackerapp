const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

// ==================
// Load env variables
// ==================
dotenv.config();

// ==================
// Connect Database
// ==================
connectDB();

const app = express();

// ==================
// CORS (Simplified & Correct)
// ==================
app.use(
  cors()
);

// ==================
// Security Middleware
// ==================
app.use(helmet());

// ==================
// Body Parsers
// ==================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================
// Rate Limiting
// ==================
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

app.use("/api", limiter);

// ==================
// Routes
// ==================
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// ==================
// Health Check Route
// ==================
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// ==================
// 404 Handler
// ==================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ==================
// Global Error Handler
// ==================
app.use(errorHandler);

// ==================
// Start Server
// ==================
const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(
    `✅ Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`
  );
});

// ==================
// Handle Unhandled Rejections
// ==================
process.on("unhandledRejection", (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

module.exports = app;
