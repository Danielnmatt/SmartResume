import jwt from "jsonwebtoken"
import {Response} from "express"
import dotenv from "dotenv"
dotenv.config()

export const generateJWTToken = (res: Response, user : any) => {
    const token = jwt.sign({user}, process.env.JWT_SECRET!, {
        expiresIn: "1d"
    })

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    }).status(201).json({success: true, user: {...user, password: undefined}})

    return token;
}