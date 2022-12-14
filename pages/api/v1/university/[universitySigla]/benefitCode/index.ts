import { NextApiRequest, NextApiResponse } from 'next';

import API400Error from '../../../../../../common/DataBase/Api400Error';
import { connect } from '../../../../../../common/DataBase/Connect';
import errorHandler from '../../../../../../common/DataBase/errorHandler';

const handler = async (req:NextApiRequest, res:NextApiResponse) =>{

    if(req.method === 'POST'){
        try{
            // console.log("req.body:", req.body);
            const {sigla, benefitId, name, lastName, cellPhone} = JSON.parse(req.body);
            // console.log("Datos:", sigla, benefitId, name, lastName, cellPhone);
            if(!sigla || !benefitId || !name || !lastName || !cellPhone){
                throw new API400Error('Faltan parametros de entrada');
            }

            const code = await generateBenefitCode(sigla as string, benefitId as string, 
                name as string, lastName as string, cellPhone as string);
            res.status(201).json({code:code});
        }catch(error){
            
            errorHandler(error, res);
        }
    }
}

const generateBenefitCode = async (sigla:string, benefitId:string, name:string, lastName:string, cellPhone:string) =>{
    let code;
    
    do{
        code  = sigla + benefitId.slice(benefitId.length - 2) + name.slice(0,1) + lastName.slice(0,1) + Math.floor(Math.random()*1000);
    }while(await checkCodeExistence(sigla,code))
    console.log("code:", code);
    return code;
    
}

const checkCodeExistence = async (sigla:string, code:string) =>{
    const bd =  await connect();
    const university_collection = bd.collection("university");
    const campaign_lead = await university_collection.findOne({sigla:sigla, "campaign_leads.benefit_code":code});
    if(campaign_lead !== null){
        return true;
    }else{
        return false;
    }
}

export default handler;