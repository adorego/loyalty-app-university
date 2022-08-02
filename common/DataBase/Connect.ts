import { Db } from 'mongodb';
import {MongoClient} from 'mongodb';

const db_uri = process.env.MONGODB_URI_ATLAS as string;

let cachedDb:Db;

export async function connect(){
    if(cachedDb){
        return cachedDb;
    }
    const client = new MongoClient(db_uri);
    await client.connect();
    cachedDb  = client.db('loyaltyapp');
    return cachedDb;
}