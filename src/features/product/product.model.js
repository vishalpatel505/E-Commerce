import ApplicationError from "../../error-handler/applicationError.js";
import UserModel from "../user/user.model.js";



export default class ProductModel{
    constructor(name,desc,imageUrl,catagories,price,sizes,id){
        this._id=id;
        this.name=name;
        this.desc=desc;
        this.imageUrl = imageUrl;
        this.catagories=catagories;
        this.price=price;
        this.sizes=sizes
    }

    


 
}


var products = [new ProductModel(1,'product1','Description for product 1','https://m.media-amazon.com/images/I/61d0dKdQqmL._AC_UF894,1000_QL80_.jpg','catagory1',19.99),
new ProductModel(2,'product2','Description for product 2','https://m.media-amazon.com/images/I/61go4LL2vSL._AC_UY1100_.jpg','catagory2',19.99,['L','XL']),
new ProductModel(3,'product3','Description for product 3','https://m.media-amazon.com/images/I/71nksBceTiL._AC_UY1100_.jpg','catagory3',19.99,['L','XL','XXL'])
]