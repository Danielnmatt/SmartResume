import { Request, Response } from "express";
import { conn } from "../server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { generateVerificationToken } from "../utils/generateVerificationToken";
import { generateJWTToken } from "../utils/generateJWTToken";

dotenv.config();

const signup = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const saltRounds = 10;
	const salt = await bcrypt.genSalt(saltRounds);
	const hashedPassword = await bcrypt.hash(password, salt);

	const verification_token = generateVerificationToken();

	const query ="INSERT INTO users (email, password, verification_token, verification_token_expires_at) VALUES ($1, $2, $3, $4) RETURNING *";
	conn.query(query, [email, hashedPassword, verification_token, new Date(Date.now() + 24 * 60 * 60 * 1000)], (err, result) => {
        if(err){
            res.status(500).json({error: "Failed to Signup"})
            return
        }
        const user = result.rows[0];
        generateJWTToken(res, user)
    });
};

export const authController = { signup };
export default authController;
