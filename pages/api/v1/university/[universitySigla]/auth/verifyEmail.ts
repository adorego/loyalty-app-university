import { NextApiRequest, NextApiResponse } from "next/types";

import { connect } from "../../../../../../common/DataBase/Connect";
import errorHandler from "../../../../../../common/DataBase/errorHandler";

const  handler = async (req:NextApiRequest, res:NextApiResponse) =>{
    
    if(req.method === 'POST'){
        try{
            const db = await connect();
            const {verified, email, sigla} = JSON.parse(req.body);
            console.log("datos:", verified, email, sigla);
            const university_collection = db.collection('university');
            const result = await university_collection.updateOne(
                {sigla:sigla, "users.email":email},
                {$set:{"users.$.verified":verified}}
            )
            console.log("result:", result);
            
            if(result.modifiedCount === 1){
                res.status(201).json({message:"Actualización exitosa", verified:true});
            }else{
                console.log("Error en la actualización:", result);
                res.status(500).json({message:"No se pudo realizar el registro"});
            }

        }catch(error){
            errorHandler(error, res);
        }
    }
}

export default handler;