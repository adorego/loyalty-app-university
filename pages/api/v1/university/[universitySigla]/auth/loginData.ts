import { NextApiRequest, NextApiResponse } from 'next';

import Api404Error from '../../../../../../common/DataBase/Api404Error';
import { authOptions } from './../../../../auth/[...nextauth]';
import { connect } from '../../../../../../common/DataBase/Connect';
import errorHandler from '../../../../../../common/DataBase/errorHandler';
import { unstable_getServerSession } from 'next-auth';

const handler = async (req:NextApiRequest, res:NextApiResponse) =>{
    if(req.method === 'POST'){
        try{
            const data = JSON.parse(req.body);
            const {sigla} = data.body;
            // console.log("data:", data);
            // console.log("sigla:", sigla);
            const session = await unstable_getServerSession(req, res, authOptions);
            const db = await connect();
            const university_collection = db.collection("university");
            const usersAll = await university_collection.findOne({sigla:sigla},{projection:{users:1}});
            // console.log("users:", usersAll);
            const this_user = usersAll?.users?.filter(
                (user:any) =>{
                    return user.email === session?.user?.email
                }
            )
            // console.log("this_user:", this_user);
            if(this_user.length > 0){
                res.status(200).json({...this_user[0]})
            }else{
                throw new Api404Error('No existe el usuario');
            }
        }
        catch(error){
            
            errorHandler(error, res);
        }
    }
}

export default handler;