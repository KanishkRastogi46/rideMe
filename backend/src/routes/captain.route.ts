import { Router } from "express";
import { body } from "express-validator";
import { register, login, profile, logout } from "../controllers/captain.controllers";
import captainAuthMiddleware from "../middlewares/captainAuth.middleware";


const router = Router();


router.post("/register",[
    body("fullname.firstName").trim().isLength({min: 3}).withMessage("First name should be minimum 3 character"),
    body("email").trim().isEmail().withMessage("Invalid Email"),
    body("password").trim().isLength({min: 6}).withMessage("Password should be minimum 6 characters"),
    body("license").isAlphanumeric().isLength({min: 10, max: 10}).withMessage("Invalid License"),
    body("vehicle.plate").trim().isAlphanumeric().isLength({min: 10, max: 10}).withMessage("Invalid Vehicle Plate"),
    body("vehicle.capacity").isNumeric().if((val: number) => (val <= 1 && val >= 9)).withMessage("Invalid Vehicle Capacity"),
    body("vehicle.color").trim().isLength({min: 3}).withMessage("Invalid Vehicle Color"),
],
    register
)

router.post("/login", [
    body("email").trim().isEmail().withMessage("Invalid Email"),
    body("password").trim().isLength({min: 6}).withMessage("Password should be minimum 6 characters"),
],
    login
)
router.get("/profile", captainAuthMiddleware, profile)

router.get("/logout", captainAuthMiddleware, logout)


export default router;