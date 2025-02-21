import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import captainModel from "../models/captain.model";
import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import ApiResponse from "../utils/apiResponse";
import ApiError from "../utils/apiErrorResponse";


const register = expressAsyncHandler(async function (req: Request, res: Response): Promise<any> {
    let errors = validationResult(req);
    if (!errors.isEmpty()) res.json(new ApiError(String(errors.array()), 400));

    try {
        console.log(req.body);
        let {fullname, email, password, license, vehicle} = req.body;

        let captainExists = await captainModel.findOne({email});
        if (captainExists) {
            return res.json(new ApiResponse(undefined, "Captain already exists", false, 202));
        } else {
            let hashedPassword = await hash(password, 10);
            let newCaptain = await captainModel.create({
                fullname,
                email,
                password: hashedPassword,
                license,
                vehicle
            });

            const refreshToken = sign({_id: newCaptain._id}, String(process.env.JWT_SECRET), {expiresIn: "7d"});
            const getCaptain = await captainModel.findOne({email}).select("-password");
            return res
                   .status(201)
                   .cookie("refreshToken", refreshToken, {
                       httpOnly: true,
                       sameSite: "none",
                       secure: process.env.NODE_ENV === "production",
                       domain: "localhost",
                    })
                   .json(new ApiResponse(getCaptain, "Captain created successfully", true, 201));
        } 
    } catch (err: any) {
        console.log(err);
        return res.status(500).json(new ApiError(err.message, 500));
    }
})

const login = expressAsyncHandler(async function (req: Request, res: Response): Promise<any> {
    let errors = validationResult(req);
    if (!errors.isEmpty()) res.json(new ApiError(String(errors.array()), 400));

    try {
        let {email, password} = req.body;
        let captain = await captainModel.findOne({email});
        if (!captain) return res.json(new ApiResponse(undefined, "Captain not found", false, 404));

        let isMatch = await compare(password, captain.password);
        if (!isMatch) return res.json(new ApiResponse(undefined, "Captain not found", false, 404));

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
                   .json(new ApiResponse(captain, "Captain logged in successfully", true, 200));
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
                   .json(new ApiResponse(captain, "Captain logged in successfully", true, 200));
        }
    } catch (err: any) {
        console.log(err);
        return res.status(500).json(new ApiError(err.message, 500));
    }
})

const profile = expressAsyncHandler(async function (req: Request, res: Response): Promise<any> {
    let errors = validationResult(req);
    if (!errors.isEmpty()) res.json(new ApiError(String(errors.array()), 400));

    let {email} = req.body.captain;
    if (!email) return res.json(new ApiResponse(undefined, "Email is required", false, 400));
    let captain = await captainModel.findOne({email});
    return res.status(200).json(new ApiResponse(captain, "Captain profile retrieved successfully", true, 200));
})

const logout = expressAsyncHandler(async function (req: Request, res: Response): Promise<any> {
    let errors = validationResult(req);
    if (!errors.isEmpty()) res.json(new ApiError(String(errors.array()), 400));

    let {email} = req.body.captain;
    if (!email) return res.json(new ApiResponse(undefined, "Email is required", false, 400));
    return res.clearCookie("accesstoken").status(200).json(new ApiResponse(undefined, "Captain profile retrieved successfully", true, 200));
})

export {
    register,
    login,
    profile,
    logout
}