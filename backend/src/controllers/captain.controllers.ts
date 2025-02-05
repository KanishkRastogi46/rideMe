import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { validationResult } from "express-validator";


const register = expressAsyncHandler(async function (req: Request, res: Response) {
    let result = validationResult(req);
    if (result.isEmpty()) res.json({error: result.array(), success: false});
})

const login = expressAsyncHandler(async function (req: Request, res: Response) {
    let result = validationResult(req);
    if (result.isEmpty()) res.json({error: result.array(), success: false});
})

const profile = expressAsyncHandler(async function (req: Request, res: Response) {
    let result = validationResult(req);
    if (result.isEmpty()) res.json({error: result.array(), success: false});
})


export {
    register,
    login,
    profile
}