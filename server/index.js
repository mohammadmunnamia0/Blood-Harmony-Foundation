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
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true,
  })
);

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
      );

      const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, // Increased timeout
        socketTimeoutMS: 45000,
        connectTimeoutMS: 30000, // Increased timeout
        retryWrites: true,
        retryReads: true,
        maxPoolSize: 10,
        minPoolSize: 5,
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

      // Test the connection
      const collections = await mongoose.connection.db
        .listCollections()
        .toArray();
      console.log(
        "Available collections:",
        collections.map((c) => c.name)
      );
    } catch (err) {
      console.error("MongoDB connection error:", err);
      retryCount++;

      if (retryCount < maxRetries) {
        console.log(`Retrying connection (${retryCount}/${maxRetries})...`);
        setTimeout(tryConnect, 5000);
      } else {
        console.error("Failed to connect to MongoDB after multiple retries");
        process.exit(1); // Exit if we can't connect to the database
      }
    }
  };

  await tryConnect();
};

// Connect to MongoDB before starting the server
connectDB()
  .then(() => {
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

    // Start server only after successful database connection
    if (process.env.NODE_ENV !== "production") {
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log("Available routes:");
        console.log("- GET /api/test");
        console.log("- GET /api/blood-requests");
        console.log("- POST /api/blood-requests");
        console.log("- GET /api/donors");
        console.log("- POST /api/auth/login");
      });
    }
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });

// For Vercel
export default app;
