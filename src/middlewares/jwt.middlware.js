import jwt from 'jsonwebtoken'

const jwtAuth = (req,res,next)=>{

    console.log("request",req.headers)

    const token = req.headers["authorization"];

    if(!token){
        console.log('1')
        return res.status(404).send("No Authorization")
    }

    try{
        const payload = jwt.verify(token,"yn5qrK71P4pWNEle5ztDKKHG9YFsfsoY")
        console.log(payload);
        
        req.userId = payload.userId;
    }
    catch(err){
        console.log("2")
        return res.status(404).send("No Authorization")
    }
    
    next()
}


export default jwtAuth