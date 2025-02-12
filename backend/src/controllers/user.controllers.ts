import expressAsyncHandler from "express-async-handler";
import { Request , Response , NextFunction } from "express";
import usersModel from "../models/users.model";
import { validationResult } from "express-validator";
import { hash , compare } from "bcryptjs";
import { sign , verify } from "jsonwebtoken";


export const register = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) : Promise<any>=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.json({error: errors.array(), success: false});
    console.log(req.body);
    const {fullname, email, password} = req.body;
    const {firstName, lastName} = fullname;

    try {
        const findUser = await usersModel.findOne({email});
        if (findUser) return res.json({message: "User already exists", success: false});
        
        const hashedPassword = await hash(password , 10);
        const newUser = await usersModel.create({
            fullname: {
                firstName,
                lastName
            },
            email,
            password: hashedPassword
        });
        let refreshToken = sign({_id: newUser._id}, String(process.env.JWT_SECRET), {expiresIn: '7d'});
        
        let getUser = await usersModel.findById({_id: newUser._id}).select("-password");
        return res.status(201).cookie('refreshtoken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            domain: "localhost",
            sameSite: "none"
        }).json({
            message: "User created successfully",
            refreshToken,
            user: getUser,
        });
    } catch (err: any) {
        console.log(err);
        return res.json({error: err.message, success: false})
    }
})


export const login = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) : Promise<any>=> {
    let errors = validationResult(req);
    if (!errors.isEmpty()) return res.json({error: errors.array(), success: false});

    const {email , password} = req.body;
    try {
        let findUser = await usersModel.findOne({email});
        if (!findUser) return res.json({message: "Invalid credentials", success: false});
        let isPasswordCorrect = await compare(password, findUser.password);
        if (!isPasswordCorrect) return res.json({message: "Invalid credentials", success: false});
        let token = req.cookies.refreshtoken || req.headers.authorization?.split(" ")[1];
        if (token) {
            let accessToken = sign({_id: findUser._id, email: findUser.email}, String(process.env.JWT_SECRET), {expiresIn: '24h'})

            let getUser = await usersModel.findById({_id: findUser._id}).select("-password");
            res.status(200).cookie('accesstoken', accessToken, {
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production',
                domain: "localhost",
                sameSite: "none"
            }).json({
                message: "Login successfull",
                user: getUser,
                accessToken,
                success: true
            })
        } else {
            let refreshToken = sign({_id: findUser._id}, String(process.env.JWT_SECRET), {expiresIn: '7d'});
            let accessToken = sign({_id: findUser._id, email: findUser.email}, String(process.env.JWT_SECRET), {expiresIn: '24h'});
            findUser.refreshToken = refreshToken;
            findUser.accessToken = accessToken;
            await findUser.save();
            let getUser = await usersModel.findById({_id: findUser._id}).select("-password");
            res.status(200).cookie('refreshtoken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                domain: "localhost",
                sameSite: "none"
            }).cookie('accesstoken', accessToken, {
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production',
                domain: "localhost",
                sameSite: "none"
            }).json({
                message: "Login successfull",
                user: getUser,
                refreshToken,
                accessToken,
                success: true
            })
        }
    } catch (err: any) {
        console.log(err);
        res.json({message: err.message, success: false})
    }
})


export const profile = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
    if (!req.body.user) return res.json({message: "No user", success: false});
    else return res.status(201).json({message: "user", user: req.body.user, success: true});
})


export const logout = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
    if (!req.body.user) return res.json({message: "No user", success: false});
    else return res.clearCookie("accesstoken").json({message: "Logout successfull", success: true});
})