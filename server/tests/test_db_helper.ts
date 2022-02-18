import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';

let connection: MongoClient;
let mongoServer: MongoMemoryServer;

export const connect = async () => {
	mongoServer = await MongoMemoryServer.create();
	connection = await MongoClient.connect( mongoServer.getUri(), {} );
};

export const close = async () => {
	await mongoose.connection.dropDatabase();
	await mongoose.connection.close();
	await mongoServer.stop();
};
