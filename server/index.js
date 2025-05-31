import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import bloodRequestRoutes from "./routes/bloodRequests.js";
import donorRoutes from "./routes/donors.js";

dotenv.config();

const app = express();

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://blood-bridge-foundation.web.app",
  "https://blood-bridge-foundation.firebaseapp.com",
  "https://bloodbridge-foundation.vercel.app",
  "http://localhost:5000",
  "http://localhost:50001",
];

// Enable CORS for all routes
app.use(cors({
  origin: true, // Allow all origins
  credentials: false,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
}));

// Add request logger middleware
app.use((req, res, next) => {
  console.log(
    `${new Date().toISOString()} - ${req.method} ${req.path} - Origin: ${
      req.headers.origin
    }`
  );
  next();
});

// Middleware
app.use(express.json());
app.use(cookieParser());

// MongoDB connection with retry logic
const connectDB = async () => {
  const maxRetries = 3;
  let retryCount = 0;

  const tryConnect = async () => {
    try {
      if (!process.env.MONGODB_URI) {
        console.error("MONGODB_URI is not defined in environment variables");
        throw new Error("MONGODB_URI is not defined in environment variables");
      }

      console.log("Attempting to connect to MongoDB...");
      console.log(
        "Connection string:",
        process.env.MONGODB_URI.replace(/:[^:@]+@/, ":****@")
      ); // Hide password in logs

      const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        connectTimeoutMS: 10000,
        retryWrites: true,
        retryReads: true,
      };

      await mongoose.connect(process.env.MONGODB_URI, options);
      console.log("Connected to MongoDB successfully");
      console.log("Database name:", mongoose.connection.name);
      console.log("Connection state:", mongoose.connection.readyState);

      // Handle connection events
      mongoose.connection.on("error", (err) => {
        console.error("MongoDB connection error:", err);
      });

      mongoose.connection.on("disconnected", () => {
        console.log("MongoDB disconnected. Attempting to reconnect...");
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(tryConnect, 5000);
        }
      });

      mongoose.connection.on("reconnected", () => {
        console.log("MongoDB reconnected");
        retryCount = 0;
      });
    } catch (err) {
      console.error("MongoDB connection error:", err);
      retryCount++;

      if (retryCount < maxRetries) {
        console.log(`Retrying connection (${retryCount}/${maxRetries})...`);
        setTimeout(tryConnect, 5000);
      } else {
        console.error("Failed to connect to MongoDB after multiple retries");
        // Don't throw the error, just log it
      }
    }
  };

  await tryConnect();
};

// Connect to MongoDB
connectDB();

// Add error handling for unhandled rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});

// Add error handling for uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/blood-requests", bloodRequestRoutes);

// Basic route for testing
app.get("/", (req, res) => {
  res.json({ message: "Welcome to BloodBridge Foundation API" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error details:", {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    origin: req.headers.origin,
    timestamp: new Date().toISOString(),
  });

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation Error",
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      message: "Token expired",
    });
  }

  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// For local development
if (process.env.NODE_ENV !== "production") {
  const startServer = async (port) => {
    try {
      const server = app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });

      server.on("error", (error) => {
        if (error.code === "EADDRINUSE") {
          console.log(`Port ${port} is in use, trying ${port + 1}...`);
          server.close();
          startServer(port + 1);
        } else {
          console.error("Error starting server:", error);
        }
      });
    } catch (error) {
      console.error("Error starting server:", error);
    }
  };

  const PORT = process.env.PORT || 5000;
  startServer(PORT);
}

// For Vercel
export default app;
