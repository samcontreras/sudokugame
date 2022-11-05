import mongoose, { Schema } from "mongoose";

const rankingSchema= new mongoose.Schema(
    {
        time:{
            type: Number,
            required:true,
        },
        difficulty:{
            type:String,
            required:true
        },
        user:{
            type: Schema.ObjectId,
            ref:"user",
            required: true
        }

    },
    {
        timestamps:true,
        /*{ timestamps: true } ).set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;
        delete object.password;
    }});*/
    }
);

export default mongoose.model("Ranking",rankingSchema);