import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import ApplicationError from "../../error-handler/applicationError.js";
import mongoose from "mongoose";
import { productSchema } from "./product.schema.js";
import { ReviewSchema } from "./review.schema.js";
import { catagorySchema } from "./catagory.schema.js";


const productModel = mongoose.model("products",productSchema);
const reviewModel = mongoose.model("Reviews",ReviewSchema)
const catagoryModel = mongoose.model('catagory',catagorySchema)


export default class ProductRepository{
    constructor(){
        this.collection = "products"
    }

    async add(newProduct){

        try{
            // const db = getDB();

            // const collection = db.collection(this.collection)   

            // await collection.insertOne(newProduct)

            // return newProduct

 // ------ REPLACE MONGODB CODE WITH MONGOOSE CODE AND IMPLEMENTING----- MANY TO MANY --- CONCEPT --------------->>>>>>>>>>

            newProduct.catagories = newProduct.catagories.split(',');
            
            const createNewProduct = await productModel(newProduct);
            await createNewProduct.save();

            await catagoryModel.updateMany({_id:{
                    $in:newProduct.catagories
                }            
            },
            {$push:{products:new ObjectId(createNewProduct._id)}}

            )
            return "new product created"
            
        }
        catch(err){
            console.log("Product add Repository err:",err)
            throw new ApplicationError("Something Went wrong with database",500);
        }
    }

    async getAll(){
        try{
            const db = getDB();

            const collection = db.collection(this.collection)   

            return await collection.find().toArray()

        }
        catch(err){
            console.log("Product getAll Repository err:",err)
            throw new ApplicationError("Something Went wrong with database",500);
        }
    }

    async getOne(id){
        try{
            const db = getDB();

            const collection = db.collection(this.collection)   

            const product =  await collection.findOne({_id:new ObjectId(id)})

            return product

        }
        catch(err){
            console.log("Product getOne Repository err:",err)
            throw new ApplicationError("Something Went wrong with database",500);
        }
    }

    async filter(minPrice,maxPrice,catagory){
        try{
            const db = getDB();

            const collection = db.collection(this.collection)   

            let filterExpression = {}

            if(minPrice){
                filterExpression.price = {$gte: parseFloat(minPrice)}
            }
            if(maxPrice){
                filterExpression.price = {...filterExpression.price,$lte:parseFloat(maxPrice)}
            }
            if(catagory){
                filterExpression.catagory = catagory;
            }

            return await collection.find(filterExpression).toArray();

        }
        catch(err){
            console.log("Product filter Repository err:",err)
            throw new ApplicationError("Something Went wrong with database",500);
        }
    }

    async rate(userId,productId,rating){
        
        // try{
        //     const db = getDB();

        //     const collection = db.collection(this.collection)

        //     await collection.updateOne(
        //         {_id:new ObjectId(productId)},
        //         {
        //             $pull:{
        //                 ratings:{userId:new ObjectId(userId)}
        //             }
        //         }
        //     )   

        //     await collection.updateOne({_id:new ObjectId(productId)},{$push:{
        //                                                                     ratings:{userId:new ObjectId(userId),rating}
        //                                                                 }
        //                                                             })
                                                                    
// ------ REPLACE MONGODB CODE WITH MONGOOSE CODE AND IMPLEMENTING----- ONE TO MANY --- CONCEPT --------------->>>>>>>>>>

        try{
            const product = await productModel.findById(productId);

            if(!product){
                throw new Error("Product not available")
            }

            const userReview = await reviewModel.findOne({user:new ObjectId(userId),product: new ObjectId(productId)}) ;

            if(userReview){
                userReview.rating=rating;
                await userReview.save()
                // --- If you already create product before reviewSchema is created, then you will not find review attribute
            }else{
                const newUserReview = new reviewModel({
                    product:new ObjectId(productId),
                    user:new ObjectId(userId),
                    rating:rating
                })

                await newUserReview.save() ;
                await productModel.updateOne({_id:new ObjectId(productId)},{reviews:new ObjectId(newUserReview._id)})
            }
        }
        catch(err){
            console.log("Product rate Repository err:",err)
            throw new ApplicationError("Something Went wrong with database",500);
        }
        
    }

}