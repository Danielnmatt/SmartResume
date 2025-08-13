import express, {Request, Response} from "express"
import {usersController} from '../controllers/usersController'
import authController from "../controllers/authController";
import {upload} from '../controllers/usersController'
const router = express.Router();

router.post("/analyzeresume", authController.authenticateUser, upload.single("resume"), usersController.processResume)
router.post("/storeresume", authController.authenticateUser, usersController.storeResume);
export default router;