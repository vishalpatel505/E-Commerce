

import { MongoClient } from "mongodb";

let client ;

 export const callMongodbServer = ()=>{
    MongoClient.connect(process.env.DB_URL)
        .then(clientInstance=>{
            client = clientInstance;
            console.log("Mongodb connected")
            createCounter(client.db());
        })
        .catch(err=>{
            console.log(err);
        })
}

export const getClient = ()=>{
    return client;
}

export const getDB = ()=>{
    return client.db();
}

const createCounter = async (db)=>{
    const existingCounter = await db.collection("counter").findOne({_id:"cartItemId"});

    if(!existingCounter){
        await db.collection("counter").insertOne({_id:"cartItemId" , value:0})
    }
}





