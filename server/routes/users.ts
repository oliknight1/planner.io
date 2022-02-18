import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import { UserSchema } from '../utils/types';

export const user_router = express.Router();

user_router.post( '/', async ( request : Request, response : Response ) => {
	// Destruct user details from request body
	const {
		display_name, email, password, tasks, projects,
	} : UserSchema = request.body;

	const user_exists = await User.findOne( { email } );

	if ( user_exists ) {
		response.status( 400 ).json( {
			error: 'Account with that email already exists',
		} );
		return;
	}

	const salt_rounds = 10;
	const password_hash = await bcrypt.hash( password, salt_rounds );

	const user = new User( {
		display_name,
		email,
		password: password_hash,
		tasks,
		projects,
	} );
	const saved_user = await user.save();

	response.status( 201 ).json( saved_user );
} );
