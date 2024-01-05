import express from 'express'
import CartItemController from './cartItem.controller.js';



const CartRouter = express.Router();

const cartItemController = new  CartItemController()

CartRouter.post('/:id',(req,res)=>{
    cartItemController.delete(req,res);
})
CartRouter.get('/',(req,res)=>{
    cartItemController.getMyCart(req,res);
})
CartRouter.post('/',(req,res)=>{
    cartItemController.addCart(req,res);
})




export default CartRouter