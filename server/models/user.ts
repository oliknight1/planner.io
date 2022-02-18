/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import mongoose from 'mongoose';
import { UserSchema } from '../utils/types';

const { Schema } = mongoose;

export const user_schema = new Schema<UserSchema>( {
	display_name: { type: String, required: true },
	password: { type: String, required: true },
	email: { type: String, required: true, index: { unique: true } },
	projects: [ { type: Schema.Types.ObjectId, ref: 'Project' } ],
	tasks: [ { type: Schema.Types.ObjectId, ref: 'Task' } ],
} );

user_schema.set( 'toJSON', {
	transform: ( _document, returned_object ) => {
		returned_object.id = returned_object._id.toString();
		delete returned_object._id;
		delete returned_object.__v;
		// the passwordHash should not be revealed
		delete returned_object.passwordHash;
	},
} );

export const User = mongoose.model( 'User', user_schema );
