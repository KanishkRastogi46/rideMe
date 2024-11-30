import mongoose from "mongoose";

export default async function connectDB() {
    try {
        const connect = await mongoose.connect(String(process.env.MONGODB_URI));
        console.log(`Database connected successfully at ${connect.connection.host}`);
    } catch (err) {
        console.log(err);
        throw err;
    }
}