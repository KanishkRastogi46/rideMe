import { Request ,  Response , NextFunction } from "express";
import { verify } from "jsonwebtoken";
import usersModel from "../models/users.model";

export default async function protectedRoute(req: Request, res: Response, next: NextFunction) : Promise<any> {
    try {
        const token = req.cookies.accesstoken || req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(300).json({message: "Token doen't exists", success: false})
        let user : any = verify(token , String(process.env.JWT_SECRET));
        let getUser = await usersModel.findById({_id: user._id}).select("_id email");
        req.body.user = {_id: getUser?._id, email: getUser?.email};
        next();
    } catch (error: Error | any) {
        console.log(error);
        return res.status(500).json({error: error.message, success: false});
    }
}