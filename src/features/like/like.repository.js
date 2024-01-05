import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";
import { ObjectId } from "mongodb";



const likeModel = mongoose.model('Likes',likeSchema);

export class likeRepository{
    async likeProduct(userId,productId){
        try{
            const newLike= new likeModel({
                user:new ObjectId(userId),
                likeable:new ObjectId(productId),
                on_Model:'products'
            })
            await newLike.save();
        }
        catch(err){
            console.log("likeproduct Repository err:",err)
            throw new ApplicationError("Something Went wrong with database",500);
        }
    }

    async likeCatagory(userId,catagoryId){
        try{
            const newLike = new likeModel({
                user:new ObjectId(userId),
                likeable:new ObjectId(catagoryId),
                on_Model:'catagory'
            })
            await newLike.save();
        }
        catch(err){
            console.log("likecatagory Repository err:",err)
            throw new ApplicationError("Something Went wrong with database",500);
        }
    }

    async getLikes(type,id){
        return await likeModel.find(
            {
                likeable:new ObjectId(id),
                on_Model:type           // this will find all likes with respect to (product , catagory) id 
            }).populate('user')  // this will populate user attribute by searching id in other collection
            .populate({path:likeable , model:type})
        }
}