import express, { Request, Response, Router } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import pg from "pg";
import helmet from "helmet";
import { OpenAI } from "openai";
import usersRoutes from "./routes/usersRoute";
import authRoutes from "./routes/authRoute";
dotenv.config();

// Database Connection
export const conn = new pg.Client({
	host: process.env.POSTGRES_HOST,
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	port: parseInt(process.env.POSTGRES_PORT || "5433"),
	database: process.env.POSTGRES_DB,
});

conn.connect()
.then(() => {
	console.log("Connected to database");
})
.catch((e) => {
	console.error("Failed to connect to database | ", e);
});

//Express setup
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true
	})
);
app.use(helmet());

app.use("/users", usersRoutes);
app.use("/auth", authRoutes);

// Server Setup/Shutdown
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
