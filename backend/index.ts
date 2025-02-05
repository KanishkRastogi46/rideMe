import { config } from "dotenv";
import express, { Express , Request , Response } from "express";
import { createServer } from "http";
import logger from "morgan";
import cors from "cors";
import cookieParser = require("cookie-parser");
import connectDB from "./src/lib/dbConnect";
import userRouter from "./src/routes/user.route"
import captainRouter from "./src/routes/captain.route";

// configuring environment variables
config();

// initializing express app with http server on port 3000
const app: Express = express();
const server = createServer(app);
const port: number = Number(process.env.PORT) 

// built-in middlewares
app.use(logger("dev"))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

// user api routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/captain", captainRouter);

// api routes
app.get("", (req: Request, res: Response)=>{
    res.json({
        message: "Hello World",
        success: true
    })
})

const startServer = function() {
    connectDB();
    server.listen(port , ()=>{
        console.log(`Server listening on port ${port}`)
    })
}
startServer();