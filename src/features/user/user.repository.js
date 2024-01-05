import mongoose from 'mongoose';
import { userSchema } from './user.schema.js';
import ApplicationError from '../../error-handler/applicationError.js';

const UserModel = mongoose.model('User',userSchema)

export default class UserRepository{
    async signUp(user){

        try{
           const newUser = new UserModel(user)   
           await newUser.save();
           return newUser;
        }
        catch(err){
           throw new ApplicationError("Something Went wrong with database",500);
        }
           
       }

    async findByEmail(email){

        try{   
           return await UserModel.findOne({email});
           
        }
        catch(err){
            console.log(err)
           throw new ApplicationError("Something Went wrong with database",500);
        }
           
       }  
       
    async resetPassword(userId,newPassword){
      try{
         const user = await UserModel.findById(userId);

         if(user){
            user.password = newPassword;
            user.save();
         }else{
            throw  new Error("No such user found");
         }
         
      }
      catch(err){
         console.log(err);
      }
    }   
}