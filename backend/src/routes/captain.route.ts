import { Router } from "express";
import { body } from "express-validator";
import { register, login, profile } from "../controllers/captain.controllers";


const router = Router();


router.route("/register").post(
    body("fullname.firstName").isLength({min: 3}).withMessage("First name should be minimum 3 character"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({min: 6}).withMessage("Password should be minimum 6 characters"),
    register
)


export default router;