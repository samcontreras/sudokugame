import mongoose, { Schema } from "mongoose";

const rankingSchema= new mongoose.Schema(
    {
        Hour:{
            type: Number,
            required:true,
        },
        Minute:{
            type: Number,
            required:true,
        },
        Second:{
            type: Number,
            required:true,
        },
    },
    {
        timestamps:true,
    }
);

export default mongoose.model("Ranking",rankingSchema);