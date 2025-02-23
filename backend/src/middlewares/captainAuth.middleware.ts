import { Request, Response, NextFunction } from "express";
import captainModel from "../models/captain.model";
import { verify } from "jsonwebtoken";
import ApiError from "../utils/apiErrorResponse";
import ApiResponse from "../utils/apiResponse";

export default async function captainAuthMiddleware(req: Request, res: Response, next: NextFunction): Promise<any> {
    let token = req.cookies.accesstoken || req.headers.authorization?.split(" ")[1];
    if (!token) return res.json(new ApiResponse(undefined, "Token not provided", false, 400));
    try {
        let payload: any = verify(token, String(process.env.JWT_SECRET));
        let captain = await captainModel.findById(payload._id);
        if (!captain) return res.json(new ApiResponse(undefined, "Captain not found", false, 404));
        req.body.captain = captain;
        next();
    } catch (error) {
        console.log(error);
        return res.json(new ApiError("Invalid Token", 400));
    }
}