import { NextApiRequest, NextApiResponse } from 'next';
export default async function authMiddleware(
    req:NextApiRequest,
    res:NextApiResponse
){
    return async function (handler: NextApiHandler){
        try{

        }catch(e){
            
        }
    }
}