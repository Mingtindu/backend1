import { Router } from "express";
import {
  changePassword,
  createUser,
  getMyProfile,
  login,
} from "../controllers/auth.controller.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.post("/register", createUser);
router.post("/login", login);
router.get("/me", auth, getMyProfile);
router.patch("/change-password", auth, changePassword);

export default router;
