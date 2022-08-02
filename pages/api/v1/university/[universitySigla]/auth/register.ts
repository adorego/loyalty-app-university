import { NextApiRequest, NextApiResponse } from "next";

import API400Error from "../../../../../../common/DataBase/Api400Error";
import API500Error from "../../../../../../common/DataBase/Api500Error";
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
            // console.log('Ocurrio un error', error);
            errorHandler(error, res);
        }
    }
    
}

async function registrarUsuario(sigla:string, email:string, cedula:string, clave:string, res:NextApiResponse){
    try{
        const db = await connect();
        const university_collection = db.collection('university');
        const hash = await hashPassword(clave);
        const email_checker = university_collection.find({
            sigla:sigla,"users.email":email});
        const existedUser = await email_checker.next();
        console.log("existedUser:", existedUser);
        if(existedUser){
            throw new API400Error('Este correo ya existe');
        }
        const verification_code = generate_verification_code();
        const sendEmailResult = await sendVerificationCodeViaEmail(email, verification_code, res);
        if(!sendEmailResult){
            throw new API500Error('No se pudo enviar el correo con la verificación');
        }
        const result = await university_collection.updateOne(
            {sigla:sigla},
            {$set:
                {users:[
                    { email, cedula, hash:hash, admin:false, verified:false}
                ]}
            },
            {upsert:true}

        );
        
        if(result.modifiedCount === 1){
            res.status(201).json({message:"Registro exitoso", verification_code:verification_code});
        }else{
            res.status(500).json({error:"No se pudo realizar el registro"});
        }
    }catch(error){
        errorHandler(error, res);
    }
    

    

}

const sendVerificationCodeViaEmail = async (email:string, code:string, res:NextApiResponse) =>{
    try{
        const response = await fetch(`http://localhost:${process.env.PORT}/api/email`,{
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


function generate_verification_code():string{
    let final_string = '';
    for(let i=0; i<6; i++){
        final_string = final_string.concat(String(Math.floor(Math.random() * 10)));
    }
    return final_string;
}

export default handler;