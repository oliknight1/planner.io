import mongoose, { Types } from 'mongoose';

export interface UserSchema {
	id?: mongoose.Types.ObjectId
	display_name: string,
	email: string,
	password: string,
	password_confirm?: string,
	projects?: Types.ObjectId[],
	tasks?: Types.ObjectId[]
}

export interface ProjectSchema {
	id?: mongoose.Types.ObjectId,
	title: string,
	users: Types.ObjectId[],
	tasks: Types.ObjectId[],
	columns: ColumnSchema[],
}

export interface TaskSchema {
	id?: mongoose.Types.ObjectId,
	title: string,
	body_text: string,
	users: Types.ObjectId[],
	project: Types.ObjectId,
	tags: string[],
	column: string,
	due_date: Date,
	dependant_tasks: Types.ObjectId[]
}
export interface ColumnSchema {
	id: mongoose.Types.ObjectId,
	title: string,
	tasks: Types.ObjectId[]
}
