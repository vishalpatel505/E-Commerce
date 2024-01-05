import './env.js'

import express from 'express';
import swagger from 'swagger-ui-express'
import cors from 'cors'
import bodyParser from 'body-parser';



import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.router.js';
import basicAutherizer from './src/middlewares/auth.middleware.js';
import jwtAuth from './src/middlewares/jwt.middlware.js';
import CartRouter from './src/features/cart/cartItem.routes.js';
// import  apiDocs from './swagger/swagger_2.0.json' assert{type:'json'} ;
import apiDocs from './swagger/swagger_3.0.json' assert{type:'json'};
import loggerMiddleware from './src/middlewares/logger.middleware.js';
import ApplicationError from './src/error-handler/applicationError.js';
// import {callMongodbServer} from './src/config/mongodb.js';
import orderRouter from './src/features/order/order.router.js';
import { connectUsingMongoose } from './src/config/mongoose.config.js';
import likeRouter from './src/features/like/like.router.js';

const server = express();



// CORS policy Configuration

const corsOption = {
    origin:"http://localhost:5502",
    allowedHeaders:"*"
}

server.use(cors(corsOption));

// server.use((req,res,next)=>{
//     res.header('Access-Control-Allow-Origin','http://localhost:5500');
//     // res.header('Access-Control-Allow-Headers','Content-Type,Autorization')
//     res.header('Access-Control-Allow-Headers','*');
//     res.header('Access-Control-Allow-Methods','*');

//     if(req.method == "OPTIONS"){
//         return res.sendStatus(200);
//     }

//     next();
// })

// for all the request related to product, this middleware redirect it to product router

server.use(express.json())

// server.use('/api/products',basicAutherizer,productRouter)

server.use(loggerMiddleware)

server.use('/api/orders',jwtAuth,orderRouter)
server.use('/api-docs',swagger.serve,swagger.setup(apiDocs));
server.use('/api/cart',loggerMiddleware,jwtAuth,CartRouter)
server.use('/api/products',jwtAuth,productRouter)
server.use('/api/users',userRouter)
server.use('/api/likes',jwtAuth,likeRouter)


// default Request Handler
server.get('/',(req,res)=>{
    res.send('Welcome to E-Commerce Website')
})

// Middleware to handle Application level and Contrller Level error

server.use((err,req,res,next)=>{
    console.log(err)

    if(err instanceof ApplicationError){
        res.status(err.statusCode).send(err.message);
    }

    res.status(500).send('Something went wrong');
})

// Middleware to handle 404 request
server.use((req,res)=>{
    res.send('Api not found. Please check api documentation in index file') ;
})

server.listen('3400',()=>{
    console.log('server is listening at port 3400')
    // callMongodbServer();
    connectUsingMongoose();
})