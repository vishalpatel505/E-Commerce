import UserModel from "./user.model.js";
import jwt from 'jsonwebtoken';
import UserRepository from "./user.repository.js";
import ApplicationError from "../../error-handler/applicationError.js";
import bcrypt from 'bcrypt'

export default class UserController{
    
    constructor(){
        this.userRepository = new UserRepository()
    }

    async resetPassword(req,res){
        const {newPassword} = req.body;
        const hashPassword = await bcrypt.hash(newPassword,12);
        const userId = req.userId;

        try{
            await this.userRepository.resetPassword(userId,hashPassword);
            res.status(200).send('Password is updated')
        }
        catch(err){
            console.log("user resetPassword controller err:",err)
            throw new ApplicationError("Something Went wrong",500);
        }
    }

    async SignUp(req,res){

        try{
            const {name,email,password,type} = req.body;

            const hashPassword = await bcrypt.hash(password,12); 

            const user = new UserModel(name,email,hashPassword,type);

            await this.userRepository.signUp(user);

            res.status(201).send(user);
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong ",500);
        }
        
    }

    async SignIn(req,res){

        try{
            const user = await this.userRepository.findByEmail(req.body.email)
            
            console.log(user)

            console.log(user.password)

            if(!user){
                return res.status(404).send('Incorrect Credentials')
            }else{
                const result = await bcrypt.compare(req.body.password, user.password);

                console.log("result",result);

                if(result){
                    const token = jwt.sign(
                        {
                            userId : user._id,
                            email : user.email
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn:"1h"
                    }
                    )
                    return res.status(200).send(token);
                }else{
                    res.status(404).send('Incorrect Credentials')
                }
            }
        }
        catch(err){
            console.log(err);
            return res.status(500).send("Something went wrong");
        }
        
    }
}   