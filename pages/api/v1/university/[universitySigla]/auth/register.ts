import { NextApiRequest, NextApiResponse } from "next";

import API400Error from "../../../../../../common/DataBase/Api400Error";
import API500Error from "../../../../../../common/DataBase/Api500Error";
import { ObjectId } from "mongodb";
import bcrypt from 'bcrypt';
import { connect } from "../../../../../../common/DataBase/Connect";
import errorHandler from "../../../../../../common/DataBase/errorHandler";

const  handler = async (req:NextApiRequest, res:NextApiResponse) =>{
    
    if(req.method === 'POST'){
        try{
            const data = JSON.parse(req.body);
            const {email, cedula, password, sigla} = data;
            
            if(!cedula  || !email || !password){
                throw new API400Error('Faltan datos para realizar el registro');
            }
            await registrarUsuario(sigla ,email, cedula, password, res);
           

        }catch(error){
            
            errorHandler(error, res);
        }
    }
    
}

async function registrarUsuario(sigla:string, email:string, cedula:string, clave:string, res:NextApiResponse){
    try{
        const db = await connect();
        const university_collection = db.collection('university');
        const hash = await hashPassword(clave);
        const existedUser = await university_collection.findOne({
            sigla:sigla,"users.email":email});
        console.log("existedUser.length", existedUser?.length);
        if(existedUser?.length > 0 ){
            console.log('Error, el correo ya existe');
            throw new API400Error('Este correo ya existe');
        }
        const verification_code = generate_verification_code();
        const sendEmailResult = await sendVerificationCodeViaEmail(email, verification_code, res);
        if(!sendEmailResult){
            throw new API500Error('No se pudo enviar el correo con la verificación');
        }
        
        const result = await university_collection.updateOne(
            {sigla:sigla},
            {$push:{users:{_id:new ObjectId, email, cedula, hash}}}
        )
        
        if(result.modifiedCount === 1){
            res.status(201).json({message:"Registro exitoso", verification_code:verification_code});
        }else{
            res.status(500).json({error:"No se pudo realizar el registro"});
        }
    }catch(error){
        errorHandler(error, res);
    }
    

    

}

export const sendVerificationCodeViaEmail = async (email:string, code:string, res:NextApiResponse) =>{
    try{
        const response = await fetch(`${process.env.API_HOST}/api/email`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email,
                subject:'Confirmación de Registro LoyaltyAPP',
                content:"Tu código de verificación es:" +code
            })
        });
        
        if(response.ok){
            return true;
        }else{
            return false
        }
        
    }catch(e:any){
        errorHandler(e, res);
        return false;
    }
    
}

async function hashPassword(password:string):Promise<string>{
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}


export function generate_verification_code():string{
    let final_string = '';
    for(let i=0; i<6; i++){
        final_string = final_string.concat(String(Math.floor(Math.random() * 10)));
    }
    return final_string;
}

export default handler;