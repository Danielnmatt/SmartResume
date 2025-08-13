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
    /*
    
    INSERT INTO users (userID, keywords)
    VALUES (req.body.userID, req.body.obj)
    ON CONFLICT (userID)
    DO UPDATE SET keywords = req.body.obj;
    
    */
    const query = "INSERT INTO data (user_id, content) VALUES ($1, $2)";
    try{
        conn.query(query, [req.body.userID, req.body.obj]);
        res.status(201).json({success: true})
    }
    catch(err){
        console.error(err);
        res.status(500).json({success: false, error: "Failed to store resume"});
    }
}


export const upload = multer({ storage });
export const usersController = { processResume, storeResume };
export default usersController;