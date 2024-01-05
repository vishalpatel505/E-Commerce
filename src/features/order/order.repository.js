import { ObjectId } from "mongodb"
import { getClient, getDB } from "../../config/mongodb.js"
import ApplicationError from "../../error-handler/applicationError.js";
import OrderModel from "./order.model.js";



export default class OrderRepository{
    constructor(){
        this.collection = "orders"
    }

    async placeOrder(userId){

        const client = getClient()
        const session = client.startSession()

        try{
            const db = getDB();

            session.startTransaction();
            // 1. Try cartItems and calculate totalAmount
            const items = await this.getTotalAmount(userId,session);
            const finalAmount = items.reduce((acc,value)=>{
                return acc+value.totalAmount;
            },0)
    
            console.log(finalAmount);

            // 2. Create an order record

            const newOrder = new OrderModel(new ObjectId(userId),finalAmount,new Date())

            await db.collection(this.collection).insertOne(newOrder,{session});

            // 3. Reduce the stock;

            for(let item of items){
                await db.collection("products").updateOne(
                    {_id:item.productId},
                    {$inc:{stock:-item.quantity}},{session})
            }

            // throw new Error("sommthing wrong")
            // 4. clear cartItems 

            await db.collection("cartItems").deleteMany({
                userId:new ObjectId(userId)
            },{session})

            await session.commitTransaction();
            session.endSession();
        }
        catch(err){
            await session.abortTransaction();
            session.endSession();
            console.log("order placeOrder Repository err:",err)
            throw new ApplicationError("Something Went wrong with database",500);
        }finally{
            client.close();
        }
        
    }

    async getTotalAmount(userId,session){
        const db = getDB()
        const collection = db.collection("cartItems")

        const items = await collection.aggregate([
            {
                $match:{
                    userId:new ObjectId(userId)
                }
            },

            {
                $lookup:{
                    from:"products",
                    localField:"productId",
                    foreignField:"_id",
                    as:"productInfo"
                }
            },

            {
                $unwind:"$productInfo"
            },

            {
                $addFields:{
                    "totalAmount":{
                        $multiply:["$productInfo.price","$quantity"]
                    }
                }    
            }
        ]).toArray();

        console.log(items)
        return items

        
    }
}