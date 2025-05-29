import express from "express";
import auth from "../middleware/auth.js";

const router = express.Router();

// Protected route example
router.get("/profile", auth, (req, res) => {
  res.json({ message: "Protected donor profile route" });
});

export default router;
