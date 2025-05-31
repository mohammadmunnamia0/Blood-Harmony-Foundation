import express from "express";
import mongoose from "mongoose";
import auth from "../middleware/auth.js";
import BloodRequest from "../models/BloodRequest.js";

const router = express.Router();

// Create a new blood request
router.post("/", auth, async (req, res) => {
  try {
    console.log("Received blood request data:", req.body);
    console.log("User from auth:", req.user);

    const {
      patientName,
      bloodType,
      units,
      hospital,
      reason,
      urgency,
      contactName,
      contactPhone,
      requiredDate,
    } = req.body;

    // Validate required fields
    const requiredFields = {
      patientName,
      bloodType,
      units,
      hospital,
      reason,
      urgency,
      contactName,
      contactPhone,
      requiredDate,
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Missing required fields",
        errors: missingFields.map((field) => ({
          field,
          message: `${field} is required`,
        })),
      });
    }

    // Validate units is a positive number
    const unitsNum = Number(units);
    if (isNaN(unitsNum) || unitsNum < 1) {
      return res.status(400).json({
        message: "Validation error",
        errors: [
          {
            field: "units",
            message: "Units must be a positive number",
          },
        ],
      });
    }

    // Validate urgency is one of the allowed values
    const validUrgencyLevels = ["emergency", "urgent", "normal"];
    if (!validUrgencyLevels.includes(urgency)) {
      return res.status(400).json({
        message: "Validation error",
        errors: [
          {
            field: "urgency",
            message: "Invalid urgency level",
          },
        ],
      });
    }

    // Validate blood type is one of the allowed values
    const validBloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    if (!validBloodTypes.includes(bloodType)) {
      return res.status(400).json({
        message: "Validation error",
        errors: [
          {
            field: "bloodType",
            message: "Invalid blood type",
          },
        ],
      });
    }

    // Create the blood request
    const bloodRequest = new BloodRequest({
      patientName,
      bloodType,
      units: unitsNum,
      hospital,
      reason,
      urgency,
      contactName,
      contactPhone,
      requiredDate,
      requestedBy: req.user._id,
      status: "pending",
    });

    console.log("Creating blood request:", bloodRequest);
    const savedRequest = await bloodRequest.save();
    console.log("Blood request saved successfully:", savedRequest);

    res.status(201).json(savedRequest);
  } catch (error) {
    console.error("Error creating blood request:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: Object.entries(error.errors).map(([field, err]) => ({
          field,
          message: err.message,
        })),
      });
    }

    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate entry",
        error: "A blood request with these details already exists",
      });
    }

    res.status(500).json({
      message: "Error creating blood request",
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
});

// Get all blood requests (public access)
router.get("/", async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.error(
        "MongoDB not connected. Current state:",
        mongoose.connection.readyState
      );
      return res.status(503).json({
        message: "Database connection not available",
        error: "Service temporarily unavailable",
      });
    }

    const requests = await BloodRequest.find()
      .populate("requestedBy", "name email")
      .sort({ createdAt: -1 })
      .lean();

    if (!requests) {
      return res.status(404).json({ message: "No blood requests found" });
    }

    res.json(requests);
  } catch (error) {
    console.error("Error fetching blood requests:", {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });

    // Handle specific MongoDB errors
    if (error.name === "MongoError" || error.name === "MongoServerError") {
      return res.status(503).json({
        message: "Database error",
        error: "Service temporarily unavailable",
      });
    }

    res.status(500).json({
      message: "Error fetching blood requests",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Get blood requests for the logged-in user (protected route)
router.get("/my-requests", auth, async (req, res) => {
  try {
    const requests = await BloodRequest.find({
      requestedBy: req.user._id,
    }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    console.error("Error fetching blood requests:", error);
    res.status(500).json({ message: "Error fetching blood requests" });
  }
});

// Update blood request status (admin only)
router.patch("/:id/status", auth, async (req, res) => {
  try {
    const { status } = req.body;
    const request = await BloodRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Blood request not found" });
    }

    request.status = status;
    await request.save();
    res.json(request);
  } catch (error) {
    console.error("Error updating blood request:", error);
    res.status(500).json({ message: "Error updating blood request" });
  }
});

export default router;
