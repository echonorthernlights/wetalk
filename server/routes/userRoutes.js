import express from "express";
import {
  getUserById,
  getUsers,
  register,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").get(getUsers);
router.route("/register").post(register);
router.route("/:id").get(getUserById);

export default router;
