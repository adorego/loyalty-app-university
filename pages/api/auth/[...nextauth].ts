import * as collectionNames from '../../../common/DataBase/CollectionsName';

import Api404Error from '../../../common/DataBase/Api404Error';
import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import { connect } from '../../../common/DataBase/Connect';
import { verify_password } from '../../../modules/auth/helpers';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email: {label: "email", type: "text", placeholder: "jose@gmail.com"},
                password:{label: "Clave", type: "password"},
                sigla:{label:"Sigla", type:"text"}
            },
            async authorize(credentials, req){

                    
                    const db = await connect();

                    const university_collection = db.collection('university');

                    const university_user = await university_collection.findOne({sigla:credentials?.sigla, 
                        "users.email": credentials?.email});
                    
                    
                    
                    if(!university_user){
                        
                        throw new Api404Error('No existe el usuario/clave');
                    }
                    if(credentials && credentials.password){
                        const valid = await verify_password(credentials?.password, university_user.users[0].hash);

                        if(!valid){
                            
                            throw new Api404Error('Error en las credenciales');
                        }
                    }

                    
                
                    return {
                        id:university_user.users[0]._id,
                        email: university_user.users[0].email
                        
                            
                    }
                
                


                

            }
        
        
        })
    ],
    secret : 'ZfrDa/0mUxfZSqauhJ4SZTxoI91bCOHpNrI0PydXmpc=',
    session: { strategy: "jwt" },
    jwt: {
        // The maximum age of the NextAuth.js issued JWT in seconds.
        // Defaults to `session.maxAge`.
        maxAge: 60 * 60 * 24 * 30,
        // You can define your own encode/decode functions for signing and encryption
        // async encode() {

        // },
        // async decode() {},
      }
});