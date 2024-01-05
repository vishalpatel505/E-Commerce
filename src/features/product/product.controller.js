import ApplicationError from "../../error-handler/applicationError.js";
import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";


export default class ProductController{

    constructor(){
        this.productRepository = new ProductRepository()
    }

    async getAllProducts(req,res){
        try{
            const products = await this.productRepository.getAll();
            res.status(200).send(products);
        }
        catch(err){
            console.log("Product getAll controller err:",err)
            throw new ApplicationError("Something Went wrong",500);
        }
      
    }

    async addProduct(req,res){

        try{
            const {name,price,sizes,catagories} = req.body;

            const newProduct =new ProductModel (
                name,
                null,
                req.file.filename,
                catagories,
                parseFloat(price),
                sizes.split(','),
            )

            const createdRecord = await this.productRepository.add(newProduct);

            res.status(201).send(createdRecord);

        }
        catch(err){
            console.log("Product add controller err:",err)
            throw new ApplicationError("Something Went wrong",500);
        }
    }

    async rateProduct(req,res){
        try{
            const userId = req.userId;
            const productId = req.body.productId;
            const rating = req.body.rating;
    
            await this.productRepository.rate(userId,productId,rating);
    
            return res.status(200).send("rating has been added");
        }
        catch(err){
            console.log("Product rate controller err:",err)
            throw new ApplicationError("Something Went wrong",500);
        }
        

    }

    async getOneProduct(req,res){
        try{
            const id = req.params.id;

            const product = await this.productRepository.getOne(id);


            if(!product){
                res.status(404).send('Product not found');
            }else{
                res.status(200).send(product)
            }
        }
        catch(err){
            console.log("Product getOne controller err:",err)
            throw new ApplicationError("Something Went wrong",500);
        }
        
    }

    async filterProducts(req,res){
        try{
            const minPrice = req.query.minPrice;
            const maxPrice = req.query.maxPrice;
            const catagory = req.query.catagory;
    
            const result = await this.productRepository.filter(minPrice,maxPrice,catagory);
            res.status(200).send(result);
        }
        catch(err){
            console.log("Product filterProduct controller err:",err)
            throw new ApplicationError("Something Went wrong",500);
        }

      
    }

}