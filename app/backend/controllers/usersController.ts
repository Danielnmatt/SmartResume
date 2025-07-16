import { Request, Response } from "express";
import { conn } from "../server";
import dotenv from "dotenv";
import { analyzeResume } from "../utils/geminiAPI";
import multer from "multer"
import os from "os"
dotenv.config();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, os.tmpdir());
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

const processResume = async (req: Request, res: Response) => {
    const response = await analyzeResume(req.file!.path);
	res.status(201).json({success: true, response});
};

const storeResume = (req: Request, res: Response) => {
    if(!req.body || !req.body.userID || !req.body.obj){
        res.status(400).json({success: false});
    }
    
    const query = "INSERT INTO data (user_id, content) VALUES ($1, $2)";
    conn.query(query, [req.body.userID, req.body.obj], (err, result) => {
        if (err) {
            res.status(500).json({ error: "Failed to save resume" });
            return;
        }
    });
    res.status(201).json({success: true})
}


export const upload = multer({ storage });
export const usersController = { processResume, storeResume };
export default usersController;