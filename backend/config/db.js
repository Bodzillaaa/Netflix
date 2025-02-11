import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(ENV_VARS.MONGO_URI);
    } catch (error) {
        process.exit(1);
    }
};
