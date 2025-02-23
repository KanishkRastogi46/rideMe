import { Request ,  Response , NextFunction } from "express";
import { verify } from "jsonwebtoken";
import usersModel from "../models/users.model";
import ApiResponse from "../utils/apiResponse";
import ApiError from "../utils/apiErrorResponse";

export default async function protectedRoute(req: Request, res: Response, next: NextFunction) : Promise<any> {
    try {
        const token = req.cookies.accesstoken || req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(300).json(new ApiResponse(undefined, "Token not provided", false, 400));
        
        let user : any = verify(token , String(process.env.JWT_SECRET));
        let getUser = await usersModel.findById({_id: user._id}).select("_id email");
        if (!getUser) return res.status(300).json(new ApiResponse(undefined, "User not found", false, 404));
        req.body.user = {_id: getUser?._id, email: getUser?.email};
        next();
    } catch (error: Error | any) {
        console.log(error);
        return res.status(500).json(new ApiError(error.message, 500));
    }
}