import mongoose, { Types } from 'mongoose';

export interface UserSchema {
	id?: mongoose.Types.ObjectId
	display_name: string,
	email: string,
	password: string,
	projects: Types.ObjectId[],
	tasks: Types.ObjectId[]
}
