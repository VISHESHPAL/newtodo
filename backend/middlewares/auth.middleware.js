import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken'

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    // console.log(token)
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Logged In",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
