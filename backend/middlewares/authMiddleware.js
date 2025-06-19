import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../modals/userModel.js";

const authenticate = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    res.status(400);
    throw new Error("Not authorized, no token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEYS);
    req.user = await User.findById(decoded.userId).select("-password");

    if (!req.user) {
      res.status(404);
      throw new Error("User not found");
    }

    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed!");
  }
});

const authorizedAdmin = (req, res, next) => {
  if (req.user?.isAdmin) {
    next();
  } else {
    res.status(400).send("Not authorized as an admin.");
  }
};

export { authenticate, authorizedAdmin };
