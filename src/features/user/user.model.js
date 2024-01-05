import { getDB } from "../../config/mongodb.js";
import ApplicationError from "../../error-handler/applicationError.js";


export default class UserModel{
    constructor(name,email,password,type,id){
        this.name=name;
        this.email=email;
        this.password=password;
        this.type=type;
        this._id=id
    }

    static getAll(){
        return users
    }
}

// var users = [
//     {
//         name:'customer1',
//         email:'customer1@gmail.com',
//         password:'password1',
//         type: 'customer',
//         id : 1
//     },
//     {
//         name:'seller1',
//         email:'seller1@gmail.com',
//         password:'password1',
//         type: 'seller',
//         id : 2
//     }
// ]