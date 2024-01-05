// This file Manages routes/path to ProductController

// 1. import express

import express from 'express' ;
import ProductController from './product.controller.js';
import {upload} from '../../middlewares/uploadFile.middleware.js';

// 2. intialize Express Router , when path call() routre will lead us to method of Product controller

const productRouter = express.Router();

const productController =new ProductController();

productRouter.post('/rate',(req,res)=>{
    productController.rateProduct(req,res);
});

productRouter.get('/filter',(req,res)=>{
    productController.filterProducts(req,res);
})

productRouter.get('/:id',(req,res)=>{
    productController.getOneProduct(req,res);
})

productRouter.get('/',(req,res)=>{
    productController.getAllProducts(req,res);
});

productRouter.post('/',upload.single('imageUrl'),(req,res)=>{
    productController.addProduct(req,res);
});





export default productRouter;

