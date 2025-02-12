import mongoose , { Document , Schema } from "mongoose";

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
    socketId: String,
    otp: String,
}, { 
    timestamps: true,
});


const usersModel = mongoose.models.users || mongoose.model<Users>("users", userSchema);

export default usersModel;