/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import mongoose from 'mongoose';
import { TaskSchema } from '../utils/types';

const { Schema } = mongoose;

export const task_schema = new Schema<TaskSchema>( {
	title: { type: String, required: true },
	body_text: String,
	users: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
	project: { type: Schema.Types.ObjectId, ref: 'Project' },
	tags: [ { type: String } ],
	due_date: Date,
	column: [ { type: Schema.Types.ObjectId, ref: 'Column' } ],
	dependant_tasks: [ { type: Schema.Types.ObjectId, ref: 'Task' } ],
} );

task_schema.set( 'toJSON', {
	transform: ( _document, returned_object ) => {
		returned_object.id = returned_object._id.toString();
		delete returned_object._id;
		delete returned_object.__v;
	},
} );

export const Task = mongoose.model( 'Task', task_schema );
