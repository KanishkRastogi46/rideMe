import { Router } from "express";
import { body } from "express-validator";
import { register, login, profile, logout } from "../controllers/captain.controllers";
import captainAuthMiddleware from "../middlewares/captainAuth.middleware";


const router = Router();


router.post("/register",[
    body("fullname.firstName").isLength({min: 3}).withMessage("First name should be minimum 3 character"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({min: 6}).withMessage("Password should be minimum 6 characters"),
    body("vehicle.plate").isAlphanumeric().isLength({min: 8, max: 8}).withMessage("Invalid Vehicle Plate"),
    body("vehicle.capacity").isNumeric().withMessage("Invalid Vehicle Capacity"),
    body("vehicle.color").isLength({min: 3}).withMessage("Invalid Vehicle Color"),
],
    register
)
router.post("/login", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({min: 6}).withMessage("Password should be minimum 6 characters"),
],
    login
)
router.post("/profile", [
    body("email").isEmail().withMessage("Invalid Email"),
    captainAuthMiddleware,
],
    profile
)
router.post("/profile", [
    body("email").isEmail().withMessage("Invalid Email"),
    captainAuthMiddleware,
],
    logout
)


export default router;