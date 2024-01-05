


export default class CartItemModel{
    constructor(productId,userId,quantity,id){
        this.productId = productId;
        this.userId = userId;
        this.quantity = quantity;
        this._id = id
    }

   
   

    static delete(userId,id){
        const index = cartItems.findIndex(value=>{
            return value.userId==userId && value.id == id; 
        })

        if(index == -1){
            return "Item not found"
        }else{
            cartItems.splice(index,1);
        }
    }

}

var cartItems = [
    new CartItemModel(1,2,1,1)
]