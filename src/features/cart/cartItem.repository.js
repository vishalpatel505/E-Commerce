import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js"
import ApplicationError from "../../error-handler/applicationError.js";



export default class CartItemRepository{
    constructor(){
        this.collection = "cartItems"
    }

    async add(productId,userId,quantity){
        try{
            const db = getDB();

            const collection = db.collection(this.collection);

            const id = await this.getNextCounter(db)
            // await collection.insertOne({productId:new ObjectId(productId),userId:new ObjectId(userId),quantity})

            await collection.updateOne(
                {productId:new ObjectId(productId),userId:new ObjectId(userId)},
                {
                    $setOnInsert:{_id:id},
                    $inc:{
                        quantity:quantity
                }},
                {upsert:true})
        }
        catch(err){
            console.log("cart item add Repository err:",err)
            throw new ApplicationError("Something Went wrong with database",500)
        }

    }

    async get(userId){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);

            return await collection.find({userId:new ObjectId(userId)}).toArray();
        }
        catch(err){
            console.log("cart item get Repository err:",err)
            throw new ApplicationError("Something Went wrong with database",500)
        }
    }

    async delete(userId,cartItemId){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);

            const result = await collection.deleteOne({_id:new ObjectId(cartItemId),userId:new ObjectId(userId)})

            return result.deletedCount>0;
        }
        catch(err){
            console.log("cart item delete Repository err:",err)
            throw new ApplicationError("Something Went wrong with database",500)
        }
    }

    async getNextCounter(db){

        const resultCounter = await db.collection("counter").findOneAndUpdate(
            {_id:"cartItemId"},
            {$inc:{value:1}},
            {returnDocument:"after"}
        )

        console.log("check: ",resultCounter.value)

        return resultCounter.value;

    }
}