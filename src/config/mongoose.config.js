import mongoose from 'mongoose'

import dotenv from 'dotenv'
import { catagorySchema } from '../features/product/catagory.schema.js';
dotenv.config();



export const connectUsingMongoose = async()=>{
    try{
        await mongoose.connect(process.env.DB_URL)

        console.log("Mongodb connected using Mongoose")

        addCatagories();
    }
    catch(err){
        console.log("Error while connecting db: ",err);
    }
}

async function addCatagories(){
    const catagoryModel = mongoose.model("catagory",catagorySchema);
    
    const catagories = catagoryModel.find();

    if(!catagories || (await catagories).length == 0){
        await catagoryModel.insertMany([{name:'Books'},{name:'clothing'},{name:'Electronics'}])
        console.log('catagories added')
    }
}
