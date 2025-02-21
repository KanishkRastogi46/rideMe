import mongoose , { Document , Schema } from "mongoose";

interface Captains extends Document{
    fullname: {
        firstName: string,
        lastName?: string
    },
    email: string,
    // phoneno: string,
    password: string,
    profile: string,
    location: string,
    isVerified: boolean,
    socketId: string,
    license: string,
    status: string,
    available: boolean,
    vehicle: {
        color: string,
        plate: string,
        type: string,
        capacity: number
    }
}

const captainSchema: Schema<Captains> = new Schema<Captains>({
    fullname: {
        firstName: { type: String, required: true },
        lastName: String
    },
    email: { type: String, required: true, unique: true },
    // phoneno: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: String,
    location: String,
    isVerified: { type: Boolean, default: false },
    socketId: String,
    license: { type: String, required: true, unique: true },
    status: { type: String, enum: ['active', 'inactive'], default: "inactive" },
    available: { type: Boolean, default: true },
    vehicle: {
        color: { type: String, required: true },
        plate: { type: String, required: true, unique: true },
        type: { type: String, enum: ['Car', 'Two-wheeler', 'Auto'], required: true },
        capacity: { type: Number, required: true }
    }
}, { 
    timestamps: true,
});


const captainModel = mongoose.models.captains<Captains> || mongoose.model<Captains>("captain", captainSchema);

export default captainModel;