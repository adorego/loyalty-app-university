import { NextApiRequest, NextApiResponse } from "next/types";
import { generate_verification_code, sendVerificationCodeViaEmail } from "./register";

import API400Error from "../../../../../../common/DataBase/Api400Error";
import { connect } from "../../../../../../common/DataBase/Connect";
import errorHandler from "../../../../../../common/DataBase/errorHandler";

const  handler = async (req:NextApiRequest, res:NextApiResponse) =>{
    
    if(req.method === 'POST'){
        try{
            const {email, sigla} = JSON.parse(req.body);
            console.log("Datos:", email, sigla);
            const verification_code = generate_verification_code();
            console.log("Verification Code:", verification_code);
            const sendEmailResult = await sendVerificationCodeViaEmail(email, verification_code, res);
            if(!sendEmailResult){
                throw new API400Error('No se pudo enviar el correo con la verificación');
            }
            res.status(200).json({message:"Envio exitoso", verification_code:verification_code});
            
        }catch(error){
            errorHandler(error, res);
        }
    }
}

export default handler;