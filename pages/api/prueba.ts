import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req:NextApiRequest, res:NextApiResponse) =>{
    res.status(200).json({message:"success"});
}

export default handler;