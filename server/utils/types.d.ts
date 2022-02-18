import { Types } from 'mongoose';

export interface UserSchema {
	id?: string
	display_name: string,
	email: string,
	password: string,
	projects: Types.ObjectId[],
	tasks: Types.ObjectId[]
}
