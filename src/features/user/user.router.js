import express from 'express';

import UserController from './user.controller.js';
import jwtAuth from '../../middlewares/jwt.middlware.js';


const userRouter = express.Router();

const userController = new UserController() ; 

userRouter.post('/signUp',(req,res)=>{
    userController.SignUp(req,res);
});

userRouter.post('/signIn',(req,res)=>{
    userController.SignIn(req,res);
});


userRouter.put('/resetPassword',jwtAuth,(req,res)=>{
    userController.resetPassword(req,res);
})

export default userRouter;