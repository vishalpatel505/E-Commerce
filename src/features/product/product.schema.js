import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
    name:String,
    description:String,
    catagory:String,
    price:Number,
    inStock:Number,
    reviews:[
        {
            
                type:mongoose.Schema.Types.ObjectId,
                ref:"reviews"
            
        }
    ],
    catagories:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"catagory"
        }
    ]
})

