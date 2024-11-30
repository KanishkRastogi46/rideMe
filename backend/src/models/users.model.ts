import mongoose , { Document , Schema } from "mongoose";
import { hash , compare } from "bcryptjs";
import { sign , verify } from "jsonwebtoken";

interface Users extends Document{
    fullname: {
        firstName: string,
        middleName?: string,
        lastName?: string
    },
    email: string,
    // phoneno: string,
    password: string,
    profile: string,
    location: string,
    isVerified: boolean,
    accessToken: string,
    refreshToken: string,
    socketId: string,
    otp: string,
}

const userSchema: Schema<Users> = new Schema<Users>({
    fullname: {
        firstName: { type: String, required: true },
        middleName: String,
        lastName: String
    },
    email: { type: String, required: true, unique: true },
    // phoneno: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: String,
    location: String,
    isVerified: { type: Boolean, default: false },
    accessToken: String,
    refreshToken: String,
    socketId: String,
    otp: String,
}, { 
    timestamps: true,
    methods: {
        checkPassword: async function(this, password: string): Promise<boolean>{
            try {
                let isPasswordCorrect = await compare(password, this.password);
                return isPasswordCorrect;
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
        generateAccessToken: function(this): string {
            let accessToken = sign({id: this._id, email: this.email}, String(process.env.JWT_SECRET), {expiresIn: "24h"});
            return accessToken;
        },
        generateRefreshToken: function(this): string {
            let refreshToken = sign({id: this._id}, String(process.env.JWT_SECRET), {expiresIn: "7d"});
            return refreshToken;
        },
    },
    statics : {
        hashPassword: async function(password: string): Promise<string>{
            try {
                let hashedPassword = await hash(password, 10);
                return hashedPassword;
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
        verifyAccessToken: function(token: string) {
            let user = verify(token, String(process.env.JWT_SECRET));
            return user;
        },
        verifyRefreshToken: function(token: string) {
            let user = verify(token, String(process.env.JWT_SECRET));
            return user;
        }
    }
});


const usersModel = mongoose.model<Users>("users", userSchema);

export default usersModel;