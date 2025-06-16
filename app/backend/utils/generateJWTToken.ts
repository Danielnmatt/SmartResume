import jwt from "jsonwebtoken"
import {Response} from "express"
import dotenv from "dotenv"
dotenv.config()

export const generateJWTToken = (res: Response, user : any) => {
    const token = jwt.sign({userID: user.id}, process.env.JWT_SECRET!, {
        expiresIn: "1d"
    })

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
    }).status(201).json({success: true, user: { ...user, password: undefined}})

    return token;
}