import express, {Request, Response} from "express"
import {conn} from "../server"
import {usersController} from '../controllers/usersController'
const router = express.Router();

export default router;