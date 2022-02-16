import { Types } from 'mongoose';

export interface User {
	id?: string
	display_name: string,
	email: string,
	password: string,
	projects: Types.ObjectId[],
	tasks: Types.ObjectId[]
}
