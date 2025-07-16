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

	const query =
		"INSERT INTO users (email, password, verification_token, verification_token_expires_at) VALUES ($1, $2, $3, $4) RETURNING *";
	conn.query(
		query,
		[email, hashedPassword, verification_token, new Date(Date.now() + 24 * 60 * 60 * 1000)],
		(err, result) => {
			if (err) {
				res.status(500).json({ error: "Failed to Signup" });
				return;
			}
			const user = result.rows[0];
			generateJWTToken(res, user);
		}
	);
};

const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const query = "SELECT * FROM users WHERE email = $1";
	conn.query(query, [email], async (err, result) => {
		if (err) {
			res.status(500).json({ error: "Failed to Login" });
			return;
		}
		if (result.rows.length === 0) {
			res.status(401).json({ error: "Incorrect email or password" });
			return;
		}
		const isMatch = await bcrypt.compare(password, result.rows[0].password);
		if (!isMatch) {
			res.status(401).json({ error: "Incorrect email or password" });
			return;
		}

		const user = result.rows[0];
		generateJWTToken(res, user);
	});
};

const logout = (req: Request, res: Response) => {
    try{
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        res.status(200).json({success: true});
		return
    }
    catch(e){
        res.status(500).send({error: "Logging out User failed."});
		return
    }
}


const getProfile = (req: Request, res: Response) => {
	const { token } = req.cookies;

	if (!token) {
		res.status(403).json()
		return;
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!);
		(<any>req).id = (<any>decoded).userID;

		const userId = (<any>req).id;
		const query = "SELECT id, email FROM users WHERE id = $1";

		conn.query(query, [userId], (err, result) => {
			if (err) {
				res.status(500).json({ error: "Failed to fetch user profile" });
				return;
			}

			res.status(200).json(result.rows[0]);
		});
	} 
	catch (err) {
		res.status(500).json({ error: "Server error." });
		return;
	}
};

const authenticateUser = (req: Request, res: Response, next: Function) => {
	const { token } = req.cookies;

	if (!token) {
		res.status(401).json({ error: "Not authenticated" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!);
		(<any>req).id = (<any>decoded).userID;
		if(req.body && req.body.userID && (<any>decoded).userID !== req.body.userID){
			throw new Error();
		}
		next();
	} catch (err) {
		res.status(403).json({ error: "Invalid or expired token" });
		return;
	}
};

export const authController = { signup, login, logout, authenticateUser, getProfile };
export default authController;
