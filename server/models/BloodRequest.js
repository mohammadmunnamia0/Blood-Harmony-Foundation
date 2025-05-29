import mongoose from "mongoose";

const bloodRequestSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
    },
    bloodType: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    units: {
      type: Number,
      required: true,
      min: 1,
    },
    hospital: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    urgency: {
      type: String,
      required: true,
      enum: ["emergency", "urgent", "normal"],
    },
    contactName: {
      type: String,
      required: true,
    },
    contactPhone: {
      type: String,
      required: true,
    },
    requiredDate: {
      type: Date,
      required: true,
    },
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "fulfilled", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const BloodRequest = mongoose.model("BloodRequest", bloodRequestSchema);

export default BloodRequest;
