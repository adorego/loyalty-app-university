import { MongoClient } from 'mongodb';
declare global {
    let mongo: MongoClient
}

export {}