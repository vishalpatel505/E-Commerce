import mongoose from "mongoose";

export const ReviewSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"products"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    rating:Number
})