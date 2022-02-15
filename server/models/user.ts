import mongoose, { Types } from 'mongoose';
import { User } from '../utils/types';

const { Schema } = mongoose;

export const user_schema = new Schema<User>( {
	username: { type: String, required: true, index: { unique: true } },
	password: { type: String, required: true },
	email: String,
	projects: [ { type: Types.ObjectId } ],
	tasks: [ { type: Types.ObjectId } ],
} );

export const UserModel = mongoose.model( 'User', user_schema );
