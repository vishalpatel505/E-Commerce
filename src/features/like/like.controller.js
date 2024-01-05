import { likeRepository } from "./like.repository.js";



export class LikeController{
    constructor(){
        this.repository=new likeRepository()
    }

    async getLikes(req, res, next){
        try{
            const {id, type} = req.query;
            const likes = await this.likeRepository.getLikes(type, id);
            return res.status(200).send(likes)
        }catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
          }
    }

    async likeItem(req,res){
        try{
            // here id = id of either product or catgory
            const {id,type}=req.body;

            if(type != 'products' || type!='catagory'){
                return res.status(400).send("invalid")
            }

            if(type=='products'){
                await this.repository.likeProduct(req.userId,id);
            }else{
                await this.repository.likeCatagory(req.userId,id)
            }

            res.status(201).send('you liked item')
        }
        catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
        }
    }
}