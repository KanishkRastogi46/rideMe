import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import captainModel from "../models/captain.model";
import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";


const register = expressAsyncHandler(async function (req: Request, res: Response): Promise<any> {
    let errors = validationResult(req);
    if (!errors.isEmpty()) res.json({error: errors.array(), success: false});

    try {
        console.log(req.body);
        let {fullname, email, password, license, vehicle} = req.body;

        let captainExists = await captainModel.findOne({email});
        if (captainExists) {
            return res.json({error: "Captain already exists", success: false});
        } else {
            let hashedPassword = await hash(password, 10);
            let newCaptain = new captainModel({
                fullname,
                email,
                password: hashedPassword,
                license,
                vehicle
            });
            await newCaptain.save();

            let refreshToken = sign({_id: newCaptain._id}, String(process.env.JWT_SECRET), {expiresIn: "7d"});
            return res
                   .status(201)
                   .cookie("refreshToken", refreshToken, {
                       httpOnly: true,
                       sameSite: "none",
                       secure: process.env.NODE_ENV === "production",
                       domain: "localhost",
                    })
                   .json({
                    success: true, 
                    message: "Captain registered successfully"
                });
        } 
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal Server Error", success: false});
    }
})

const login = expressAsyncHandler(async function (req: Request, res: Response): Promise<any> {
    let result = validationResult(req);
    if (result.isEmpty()) res.json({error: result.array(), success: false});

    try {
        let {email, password} = req.body;
        let captain = await captainModel.findOne({email});
        if (!captain) return res.json({error: "Captain not found", success: false});

        let isMatch = await compare(password, captain.password);
        if (!isMatch) return res.json({error: "Invalid Password", success: false});

        let token = req.cookies.refreshToken || req.headers.authorization?.split(" ")[1];
        let refreshToken = verify(token, String(process.env.JWT_SECRET));
        if (refreshToken) {
            let accesstoken = sign({_id: captain._id, email: captain.email}, String(process.env.JWT_SECRET), {expiresIn: "24h"});
            return res
                   .status(200)
                   .cookie("accesstoken", accesstoken, {
                       httpOnly: true,
                       sameSite: "none",
                       secure: process.env.NODE_ENV === "production",
                       domain: "localhost",
                    })
                   .json({
                    success: true, 
                    message: "Captain logged in successfully",
                    captain
                });
        } else {
            let newRefreshToken = sign({_id: captain._id}, String(process.env.JWT_SECRET), {expiresIn: "7d"});
            let accesstoken = sign({_id: captain._id, email: captain.email}, String(process.env.JWT_SECRET), {expiresIn: "24h"});

            return res
                   .status(200)
                   .cookie("refreshToken", newRefreshToken, {
                       httpOnly: true,
                       sameSite: "none",
                       secure: process.env.NODE_ENV === "production",
                       domain: "localhost",
                    })
                   .cookie("accesstoken", accesstoken, {
                       httpOnly: true,
                       sameSite: "none",
                       secure: process.env.NODE_ENV === "production",
                       domain: "localhost",
                    })
                   .json({
                    success: true, 
                    message: "Captain logged in successfully",
                    captain
                });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal Server Error", success: false});
    }
})

const profile = expressAsyncHandler(async function (req: Request, res: Response): Promise<any> {
    let result = validationResult(req);
    if (result.isEmpty()) res.json({error: result.array(), success: false});

    let {email} = req.body.captain;
    if (!email) return res.json({error: "Email is required", success: false});
    let captain = await captainModel.findOne({email});
    return res.status(200).json({success: true, captain});
})

const logout = expressAsyncHandler(async function (req: Request, res: Response): Promise<any> {
    let result = validationResult(req);
    if (result.isEmpty()) res.json({error: result.array(), success: false});

    let {email} = req.body.captain;
    if (!email) return res.json({error: "Email is required", success: false});
    return res.clearCookie("accesstoken").status(200).json({success: true, message: "Captain logged out successfully"});
})

export {
    register,
    login,
    profile,
    logout
}