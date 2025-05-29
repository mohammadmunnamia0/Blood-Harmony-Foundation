import jwt from "jsonwebtoken";
import User from "../models/User.js";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "bloodservice_secret_key_2024"
    );

    console.log("Decoded token:", decoded);

    if (!decoded.userId) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    // Find the user by ID
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Set both the full user object and the ID
    req.user = user;
    req.userId = user._id; // Use the ID from the user object directly

    console.log("Auth middleware - User:", user);
    console.log("Auth middleware - User ID:", user._id);

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default auth;
