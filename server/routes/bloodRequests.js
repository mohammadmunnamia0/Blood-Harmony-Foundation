import express from "express";
import auth from "../middleware/auth.js";
import BloodRequest from "../models/BloodRequest.js";

const router = express.Router();

// Create a new blood request
router.post("/", auth, async (req, res) => {
  try {
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

    const bloodRequest = new BloodRequest({
      patientName,
      bloodType,
      units,
      hospital,
      reason,
      urgency,
      contactName,
      contactPhone,
      requiredDate,
      requestedBy: req.user._id,
      status: "pending",
    });

    await bloodRequest.save();
    res.status(201).json(bloodRequest);
  } catch (error) {
    console.error("Error creating blood request:", error);
    res.status(500).json({ message: "Error creating blood request" });
  }
});

// Get all blood requests for the logged-in user
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

// Get all blood requests (for admin)
router.get("/", auth, async (req, res) => {
  try {
    const requests = await BloodRequest.find()
      .populate("requestedBy", "name email")
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    console.error("Error fetching blood requests:", error);
    res.status(500).json({ message: "Error fetching blood requests" });
  }
});

// Update blood request status
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
