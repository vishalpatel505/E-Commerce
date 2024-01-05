import UserModel from "../features/user/user.model.js";


const basicAutherizer = (req,res,next)=>{

    const authHeader = req.headers["authorization"];

    if(!authHeader){
        res.status(401).send("No authorization detail found");
    }

    console.log(authHeader);

    const base64Credentials = authHeader.replace("Basic ","");

    console.log(base64Credentials);

    const decodedCreds = Buffer.from(base64Credentials,'base64').toString('utf8');

    console.log(decodedCreds);

    const creds = decodedCreds.split(':');

    const user = UserModel.getAll().find((value)=>{
        return value.email == creds[0] && value.password == creds[1];
    })

    if(user){
        next();
    }else{
        res.status(401).send('Incorrect Credentials')
    }
}

export default basicAutherizer