import { Request, Response } from "express";
import { conn } from "../server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { body, validationResult } from "express-validator";
import { generateVerificationToken } from "../utils/generateVerificationToken";
import { generateJWTToken } from "../utils/generateJWTToken";

dotenv.config();

// Validation rules
export const signupValidation = [
	body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email address"),
	body("password")
		.isLength({ min: 8 })
		.withMessage("Password must be at least 8 characters long")
		.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]*$/)
		.withMessage("Password must contain at least one uppercase letter, one lowercase letter, and one number"),
];

export const loginValidation = [
	body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email address"),
	body("password").notEmpty().withMessage("Password is required"),
];

const signup = async (req: Request, res: Response) => {
	// Check for validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json({
			error: "Validation failed",
			details: errors.array(),
		});
		return;
	}

	try {
		const { email, password } = req.body;

		// Check if user already exists
		const existingUser = await conn.query("SELECT id FROM users WHERE email = $1", [email]);
		if (existingUser.rows.length > 0) {
			res.status(409).json({ error: "User already exists" });
			return;
		}

		const saltRounds = 12; // Increased for better security
		const salt = await bcrypt.genSalt(saltRounds);
		const hashedPassword = await bcrypt.hash(password, salt);
		const verification_token = generateVerificationToken();

		const query =
			"INSERT INTO users (email, password, verification_token, verification_token_expires_at) VALUES ($1, $2, $3, $4) RETURNING *";

		const result = await conn.query(query, [
			email,
			hashedPassword,
			verification_token,
			new Date(Date.now() + 24 * 60 * 60 * 1000),
		]);

		const user = result.rows[0];
		generateJWTToken(res, user);
	} catch (err) {
		console.error("Signup error:", err);
		res.status(500).json({ error: "Failed to create account" });
		return;
	}
};

const login = async (req: Request, res: Response) => {
	// Check for validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json({
			error: "Validation failed",
			details: errors.array(),
		});
		return;
	}

	try {
		const { email, password } = req.body;
		const query = "SELECT * FROM users WHERE email = $1";
		const result = await conn.query(query, [email]);

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
	} catch (err) {
		console.error("Login error:", err);
		res.status(500).json({ error: "Failed to login" });
	}
};

const logout = (req: Request, res: Response) => {
	try {
		res.clearCookie("token", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
		});
		res.status(200).json({ success: true });
	} catch (e) {
		console.error("Logout error:", e);
		res.status(500).json({ error: "Logging out user failed" });
	}
};

const getProfile = async (req: Request, res: Response) => {
	const { token } = req.cookies;

	if (!token) {
		res.status(403).json({ error: "No token provided" });
		return;
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!);
		const userId = (<any>decoded).userID;

		const query = "SELECT id, email FROM users WHERE id = $1";
		const result = await conn.query(query, [userId]);

		if (result.rows.length === 0) {
			res.status(404).json({ error: "User not found" });
			return;
		}

		res.status(200).json(result.rows[0]);
	} catch (err) {
		console.error("Get profile error:", err);
		res.status(500).json({ error: "Server error" });
	}
};

const authenticateUser = (req: Request, res: Response, next: Function) => {
	const { token } = req.cookies;

	if (!token) {
		res.status(401).json({ error: "Not authenticated" });
		return;
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!);
		(<any>req).id = (<any>decoded).userID;
		if (req.body && req.body.userID && (<any>decoded).userID !== req.body.userID) {
			throw new Error("User ID mismatch");
		}
		next();
	} catch (err) {
		console.error("Authentication error:", err);
		res.status(403).json({ error: "Invalid or expired token" });
		return;
	}
};

const authController = { signup, login, logout, authenticateUser, getProfile };
export default authController;
