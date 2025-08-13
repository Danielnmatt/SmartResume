import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import pg from "pg";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import usersRoutes from "./routes/usersRoute";
import authRoutes from "./routes/authRoute";
import jobRoutes from "./routes/jobRoute";
import axios from "axios";
dotenv.config();

// Database Connection Pool
export const pool = new pg.Pool({
	host: process.env.POSTGRES_HOST,
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	port: parseInt(process.env.POSTGRES_PORT || "5433"),
	database: process.env.POSTGRES_DB,
	max: 20,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 2000,
});

pool.connect()
	.then((client) => {
		console.log("Connected to database");
		client.release();
	})
	.catch((e) => {
		console.error("Failed to connect to database | ", e);
		process.exit(1);
	});

export const conn = {
	query: (text: string, params?: any[]) => pool.query(text, params),
	end: () => pool.end(),
};

const limiter = rateLimit({
	windowMs: 60 * 1000,
	max: 20,
	message: {
		error: "Too many requests from this IP, please try again later.",
	},
	standardHeaders: true,
	legacyHeaders: false,
});

const authLimiter = rateLimit({
	windowMs: 60 * 1000,
	max: 10,
	message: {
		error: "Too many authentication attempts, please try again later.",
	},
	standardHeaders: true,
	legacyHeaders: false,
});

const app = express();

app.use(
	helmet({
		contentSecurityPolicy: {
			directives: {
				defaultSrc: ["'self'"],
				styleSrc: ["'self'", "'unsafe-inline'"],
				scriptSrc: ["'self'"],
				imgSrc: ["'self'", "data:", "https:"],
			},
		},
	})
);

app.use(limiter);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(
	cors({
		origin: process.env.FRONTEND_URL || "http://localhost:5173",
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization", "cache-control", "pragma"],
	})
);

app.use("/users", usersRoutes);
app.use("/auth", authLimiter, authRoutes);
app.use("/jobs", jobRoutes);

app.get("/api/jsearch", async (req, res) => {
	const options = {
		method: "GET",
		url: "https://jsearch.p.rapidapi.com/search",
		params: {
			query: "Software engineer in New York",
			page: "1",
			num_pages: "2"
		},
		headers: {
			"x-rapidapi-key": process.env.RAPIDAPI_KEY,
			"x-rapidapi-host": "jsearch.p.rapidapi.com",
		},
	};

	try {
		const response = await axios.request(options);
		res.json(response.data);
	} catch (err) {
		res.status(500).json({ error: "Failed to fetch salary data" });
	}
});

app.get("/health", (req: Request, res: Response) => {
	res.status(200).json({
		status: "OK",
		timestamp: new Date().toISOString(),
		uptime: process.uptime(),
	});
});

const server = app.listen(process.env.PORT, () => {
	console.log("Server started on port " + process.env.PORT);
});

const shutdown = (msg: string) => {
	console.log(`${msg} receieved, shutting down...`);
	server.close((err) => {
		if (err) {
			console.error("Error closing server: ", err);
		}
		conn.end()
			.then(() => {
				console.log("Database connection closed.");
				process.exit(0);
			})
			.catch((err) => {
				console.error("Error closing database connection: ", err);
				process.exit(1);
			});
	});
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("uncaughtException", () => shutdown("Uncaught Exception"));
