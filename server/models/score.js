import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        score: {
            type: Number,
        },
    }
);

export const Score = mongoose.model("Score", scoreSchema);