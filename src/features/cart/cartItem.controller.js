import ApplicationError from "../../error-handler/applicationError.js";
import CartItemModel from "./cartItem.model.js";
import CartItemRepository from "./cartItem.repository.js";




export default class CartItemController{

    constructor(){
        this.cartItemRepository = new CartItemRepository();
    }
    
    async addCart(req,res){
        try{
            const {productId,quantity} = req.body;

            const userId = req.userId;
    
            await this.cartItemRepository.add(productId,userId,quantity);
    
            res.status(201).send("cart has beeen updated");
        }
        catch(err){
            console.log("cart item add controller err:",err)
            throw new ApplicationError("Something Went wrong",500);
        }
        
    }

    async getMyCart(req,res){

        try{
            const userId = req.userId;

            const cartItems = await this.cartItemRepository.get(userId);
    
            res.status(200).send(cartItems)
        }
        catch(err){
            console.log("cart item get controller err:",err)
            throw new ApplicationError("Something Went wrong",500);
        }
        
    }

    async delete(req,res){
        const userId = req.userId;
        const id = req.params.id;

        const isDeleted = await this.cartItemRepository.delete(userId,id);

        if(!isDeleted){
            return res.status(404).send("Item not found")
        }
        return res.status(200).send("item has been removed")
    }

}