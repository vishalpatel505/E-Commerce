import mongoose from "mongoose";




export const catagorySchema = new mongoose.Schema({
    name:String,
    products:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"products"
    }
]
})