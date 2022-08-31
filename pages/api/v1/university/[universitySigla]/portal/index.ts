import { NextApiRequest, NextApiResponse } from 'next';
import runMiddleware, { cors } from '../../../../_cors';

import API400Error from './../../../../../../common/DataBase/Api400Error';
import {connect} from '../../../../../../common/DataBase/Connect';
import errorHandler from '../../../../../../common/DataBase/errorHandler';

const handler = async (req:NextApiRequest, res:NextApiResponse) =>{
    await runMiddleware(req, res, cors);
    
    if(req.method === 'GET'){
        try{
            const {universitySigla} = req.query;
            if(!universitySigla){
                throw new API400Error('Falta el parametro sigla');
            }
            await getUniversityPortal(universitySigla as string, res);
        }catch(error){
            console.log('Ocurrio un error', error);
            errorHandler(error, res);
        }
    }
}


async function getUniversityPortal(sigla:string, res:NextApiResponse){
        
        const db = await connect();

        const university_collection = db.collection('university');
        // console.log("university_collection:", university_collection);
        const result:any = await university_collection.findOne({sigla:sigla});
        //console.log("data:", result);

        const portalData = {
            logo:result.logo, 
            favicon:result.favicon,
            primary_color:result.configuration.primaryColor,
            secondary_color:result.configuration.secondaryColor,
            secondaryLight_color:result.configuration.secondaryLightColor,
            title:result.portal.title,
            backGroundImage:result.portal.backgroundImage,
            backGroundImage_large:result.portal.backgroundImage_large,
            buttonText:result.portal.buttonText,
            forText:result.portal.forText,
            links:result.portal.links,
            contact_email:result.portal.contact_email,
            contact_phone:result.portal.contact_phone,
            contact_whatsapp:result.portal.contact_whatsapp,
            headInfo:{
                title:result.portal.title,
                description:result.portal.forText,
                favicon:result.favicon,
                social_image:result.portal.social_image,
                url:result.portal.portalUrl
            }

        }
        res.status(200).json({...portalData});
    
}

export default handler;