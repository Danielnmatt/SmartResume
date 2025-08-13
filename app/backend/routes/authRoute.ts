import express from "express";
import authController from "../controllers/authController";
import { signupValidation, loginValidation } from '../controllers/authController'
const router = express.Router();

router.post("/signup", signupValidation, authController.signup);

router.post("/login", loginValidation, authController.login);

router.post("/logout", authController.logout);

router.get("/profile", authController.getProfile);

export default router;
