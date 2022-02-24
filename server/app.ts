import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { MONGODB_URI } from './utils/config';
import { user_router } from './routes/users';
import { project_router } from './routes/projects';
import { task_router } from './routes/tasks';

export const app = express();

app.use( cors() );
app.use( express.json() );
app.use( '/api/users', user_router );
app.use( '/api/projects', project_router );
app.use( '/api/tasks', task_router );

mongoose.connect( MONGODB_URI as string )
	.then( () => {
		console.log( 'Connected to MongoDB database' );
	} )
	.catch( ( error : Error ) => {
		console.error( 'Error connecting to MongoDB', error );
	} );
