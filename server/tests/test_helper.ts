import { User } from '../models/user';
import { UserSchema } from '../utils/types';

export const initial_users : UserSchema[] = [ {
	id: '123',
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
