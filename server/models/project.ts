/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import mongoose from 'mongoose';
import { ProjectSchema } from '../utils/types';

const { Schema } = mongoose;

export const project_schema = new Schema<ProjectSchema>( {
	title: { type: String, required: true },
	users: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
	tasks: [ { type: Schema.Types.ObjectId, ref: 'Task' } ],
} );

project_schema.set( 'toJSON', {
	transform: ( _document, returned_object ) => {
		returned_object.id = returned_object._id.toString();
		delete returned_object._id;
		delete returned_object.__v;
	},
} );

export const Project = mongoose.model( 'Project', project_schema );
