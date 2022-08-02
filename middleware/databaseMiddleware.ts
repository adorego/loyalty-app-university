import { NextApiRequest, NextApiResponse } from 'next';

import { MongoClient } from "mongodb";

(global as any).mongo = (global as any).mongo as MongoClient || {};

export async function getMongoClient(){
    if (!(global as any).mongo.client){
        (global as any).mongo.client = new MongoClient(process.env.MONGODB_URI as string)
    }

    await (global as any).mongo.client.connect();
    return (global as any).mongo.client;
}

export default async function database(req: NextApiRequest, res: NextApiResponse, next:any){
    if (!(global as any).mongo.client) {
        (global as any).mongo.client = new MongoClient(process.env.MONGODB_URI as string);
      }
      (req as any).dbClient = await getMongoClient();
      (req as any).db = (req as any).dbClient.db(); // this use the database specified in the MONGODB_URI (after the "/")
    //   if (!indexesCreated) await createIndexes((req as any).db);
      return next();
}