import mongoose from 'mongoose';
import { User } from '../models/user';
import { UserSchema } from '../utils/types';

export const initial_users : UserSchema[] = [ {
	id: new mongoose.Types.ObjectId(),
	display_name: 'user1',
	email: 'email1@email.com',
	password: 'password1',
	tasks: [],
	projects: [],
} ];

// Returns a list of all users in test database
export const users_in_db = async () : Promise<UserSchema[]> => {
	const users = await User.find();
	return users.map( ( user ) => user.toJSON() );
};

// Returns the first user from the list to be used to target in tests
export const get_target_user = async () => {
	const users_pre_test = await users_in_db();
	return users_pre_test[0];
};

export const generate_fake_id = async () => {
	const id = new mongoose.Types.ObjectId();
	const user = await get_target_user();
	const real_id = user.id;
	if ( id === real_id ) {
		generate_fake_id();
	}
	return id;
};
