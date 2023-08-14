import express from "express";
import {
  auth,
  getUserById,
  getUsers,
  logoutUser,
  register,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getUsers);
router.route("/register").post(register);
router.route("/login").post(auth);
router.route("/logout").post(logoutUser);
router.route("/:id").get(protect, getUserById);

export default router;
