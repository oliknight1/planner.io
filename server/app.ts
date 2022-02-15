import express from 'express';
import mongoose from 'mongoose';
import { MONGODB_URI } from './utils/config';

mongoose.connect( MONGODB_URI as string )
	.then( () => {
		console.log( 'Connected to MongoDB database' );
	} )
	.catch( ( error ) => {
		console.error( 'Error connecting to MongoDB', error );
	} );
export const app = express();
