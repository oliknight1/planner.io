import mongoose from 'mongoose';
import { User } from '../utils/types';

const { Schema } = mongoose;

export const user_schema = new Schema<User>( {
	username: { type: String, required: true, index: { unique: true } },
	password: { type: String, required: true },
	email: { type: String, required: true, index: { unique: true } },
	projects: [ { type: Schema.Types.ObjectId, ref: 'Project' } ],
	tasks: [ { type: Schema.Types.ObjectId, ref: 'Task' } ],
} );

export const UserModel = mongoose.model( 'User', user_schema );
