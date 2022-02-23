import mongoose from 'mongoose';
import { UserSchema, ProjectSchema } from '../../utils/types';
import { User } from '../../models/user';
import { Project } from '../../models/project';

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

export const generate_fake_id =	( real_id : mongoose.Types.ObjectId | undefined )
		: mongoose.Types.ObjectId | null => {
	if ( real_id === undefined ) {
		return null;
	}
	const id = new mongoose.Types.ObjectId();
	if ( id === real_id ) {
		generate_fake_id( real_id );
	}
	return id;
};

export const project_in_db = async () : Promise<ProjectSchema[]> => {
	const projects = await Project.find();
	return projects.map( ( project ) => project.toJSON() );
};

export const get_target_project = async () => {
	const projects = await project_in_db();
	return projects[0];
};
