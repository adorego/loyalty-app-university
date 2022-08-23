import { NextApiRequest, NextApiResponse } from 'next';

import API400Error from '../../../../../../common/DataBase/Api400Error';
import { DefaultSession } from 'next-auth';
import { authOptions } from '../../../../auth/[...nextauth]';
import { connect } from '../../../../../../common/DataBase/Connect';
import errorHandler from '../../../../../../common/DataBase/errorHandler';
import { unstable_getServerSession } from "next-auth";

const handler = async (req:NextApiRequest, res:NextApiResponse) =>{
    const session = await unstable_getServerSession(req, res, authOptions);
    console.log("session in handler:", session);
    try{
        // if(!session){
        //     throw new API401Error('Usuario no autorizado');
        // }
        if(req.method === 'GET'){
            const {universitySigla} = req.query;

            if(universitySigla === ""){
                throw new API400Error("Los parametros enviados son incorrectos");
            }
            res.status(200).json({message:"Hasta aqui"});
            //mainClientData(String(universitySigla), session, res);
            
        }
    }
    catch(error){
        errorHandler(error, res);
    }
}

const mainClientData = async (sigla:string, session:DefaultSession, res:NextApiResponse) =>{
    const db = await connect();
    const university_collection = db.collection("university");

    const result = await university_collection.findOne({sigla:sigla, "users.email":session.user?.email});

    console.log("result:", result);
    
    res.status(200).json({...result});

    if(result === null){
        throw new API400Error("Los parametros enviados son incorrectos");
    }

}

export default handler;