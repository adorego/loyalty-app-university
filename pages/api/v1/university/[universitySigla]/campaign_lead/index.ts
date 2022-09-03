import { NextApiRequest, NextApiResponse } from 'next';

import API400Error from '../../../../../../common/DataBase/Api400Error';
import Api500Error from '../../../../../../common/DataBase/Api500Error';
import Benefit from '../../../../../../common/models/benefit';
import CampaignModel from '../../../../../../common/models/campaignModel';
import { ConfiguredBenefit } from './../../../../../../common/models/configuredBenefit';
import { ObjectId } from 'mongodb';
import { authOptions } from './../../../../auth/[...nextauth]';
import { connect } from '../../../../../../common/DataBase/Connect';
import errorHandler from '../../../../../../common/DataBase/errorHandler';
import { unstable_getServerSession } from 'next-auth';

const handler = async (req:NextApiRequest, res:NextApiResponse) =>{
    if(req.method === 'POST'){
        try{
            //Get name, lastName, cellphone, campaignId, 
            const session = unstable_getServerSession(req, res, authOptions);
            const {name, lastName, cellPhone, campaign_id, benefitCode, sigla, source_user} = JSON.parse(req.body);
            // console.log("Data received:", name, lastName, cellPhone, campaign_id, benefitCode, sigla);
            if(!name || !lastName || !cellPhone || !campaign_id || !benefitCode || !sigla){
                throw new API400Error('Faltan parametros de entrada');
            }
            const bd = await connect();
            const university_collection = bd.collection("university");
            //Check benefitCode existance
            const campaign_lead = await university_collection.findOne({sigla:sigla, "campaign_leads.benefit_code": benefitCode}, {projection:{campaign_leads:1}});
            if(campaign_lead !== null){
                throw new Api500Error('Ya existe este código de beneficio');
            }
            const campaignsResult = await university_collection.findOne({sigla:sigla, "campaigns._id":new ObjectId(campaign_id)},{projection:{campaigns:1, benefits:1}});
            // console.log("campaign:", campaignsResult);
            const campaign = campaignsResult?.campaigns.filter(
                (item:CampaignModel) =>{
                    return item._id.toString() === campaign_id
                }

            )
            console.log("campaign:", campaign[0]);
            const benefit = campaignsResult?.benefits.filter(
                (item:ConfiguredBenefit) =>{
                    return item.benefit._id.toString() === campaign[0].benefit.toString()
                }
            )
            
            const validity_date = new Date();
            validity_date.setDate(new Date().getDate() + campaign[0].validity_days);
            // console.log("validity_date:", validity_date);
            const result = await university_collection.updateOne({sigla:sigla},
                {$push:{campaign_leads:{
                    source_user:new ObjectId(source_user),
                    benefit_code:benefitCode,
                    name,
                    lastName,
                    cellPhone,
                    campaign_id:new ObjectId(campaign_id),
                    validity_date: validity_date,
                    request_contact:false,
                    head_information:benefit[0].head_information
                }}}
            );
            if(result.modifiedCount === 1){
                res.status(201).json({message:"ok"});
            }else{
                res.status
            }
            
        }catch(error){
            errorHandler(error, res);
        }

    }
}

export default handler;