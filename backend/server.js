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
// Connect DB
// ==================
connectDB();

const app = express();

// ==================
// CORS (Keep simple for dev)
// ==================
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
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
  windowMs: 10 * 60 * 1000,
  max: 100,
});

app.use("/api", limiter);

// ==================
// Routes
// ==================
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// ==================
// Health Route
// ==================
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

// ==================
// 404 Handler (MUST be after routes)
// ==================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ==================
// Global Error Handler (LAST middleware)
// ==================
app.use(errorHandler);

// ==================
// Start Server
// ==================
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
});

// ==================
// Handle Unhandled Rejections
// ==================
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

module.exports = app;
