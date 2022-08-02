import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req:NextApiRequest, res:NextApiResponse){
    const {universitySigla:sigla} = req.query as {universitySigla:string};
    if(req.method === 'GET'){
        
        res.status(200).json({slug:sigla});
    }
}