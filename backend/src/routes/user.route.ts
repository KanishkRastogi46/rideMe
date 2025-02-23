import { Router , Request , Response } from "express";
import { body } from 'express-validator';
import { login, logout, profile, register } from "../controllers/user.controllers";
import protectedRoute from "../middlewares/userAuth.middleware";

const router = Router();

router.post("/register", [
    body("fullname.firstName").trim().isLength({min: 3}).withMessage("First name should be minimum 3 character"),
    body("email").trim().isEmail().withMessage("Invalid Email"),
    body("password").trim().isLength({min: 6}).withMessage("Password should be minimum 6 characters")
], register);

router.post("/login", [
    body("email").trim().isEmail().withMessage("Invalid Email"),
    body("password").trim().isLength({min: 6}).withMessage("Password should be minimum 6 characters")
], login);

router.get("/profile", protectedRoute,profile);

router.get("/logout", protectedRoute, logout);

export default router;