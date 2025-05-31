import express from "express";
import auth from "../middleware/auth.js";
import User from "../models/User.js"; // Import the User model

const router = express.Router();

// Get all donors (users with role 'donor')
router.get("/", async (req, res) => {
  try {
    const donors = await User.find({ role: "donor" }).select("-password"); // Find users with role 'donor' and exclude password
    res.status(200).json(donors);
  } catch (error) {
    console.error("Error fetching donors:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Protected route example
router.get("/profile", auth, (req, res) => {
  res.json({ message: "Protected donor profile route" });
});

export default router;
