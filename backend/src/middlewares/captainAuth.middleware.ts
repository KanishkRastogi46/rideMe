import { Request, Response, NextFunction } from "express";
import captainModel from "../models/captain.model";
import { verify } from "jsonwebtoken";

export default async function captainAuthMiddleware(req: Request, res: Response, next: NextFunction): Promise<any> {
    let token = req.cookies.accesstoken || req.headers.authorization?.split(" ")[1];
    if (!token) return res.json({error: "Token not provided", success: false});
    try {
        let payload: any = verify(token, String(process.env.JWT_SECRET));
        let captain = await captainModel.findById(payload._id);
        if (!captain) return res.json({error: "Captain not found", success: false});
        req.body.captain = captain;
        next();
    } catch (error) {
        console.log(error);
        return res.json({error: "Invalid Token", success: false});
    }
}