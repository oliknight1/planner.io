import { UserModel } from '../models/user';
import { User } from '../utils/types';

export const initial_users : User[] = [ {
	id: '123',
	username: 'user1',
	email: 'email1@email.com',
	password: 'password1',
	tasks: [],
	projects: [],
} ];

// Returns a list of all users in test database
export const users_in_db = async () : Promise<User[]> => {
	const users = await UserModel.find();
	return users.map( ( user ) => user.toJSON() );
};

// Returns the first user from the list to be used to target in tests
export const get_target_user = async () => {
	const users_pre_test = await users_in_db();
	return users_pre_test[0];
};
