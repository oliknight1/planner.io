import { Types } from 'mongoose';

export interface User {
	username: string,
	email: string,
	password: string,
	projects: Types.ObjectId[],
	tasks: Types.ObjectId[]
}
