import { validationResult } from 'express-validator';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import { UserSchema } from '../utils/types';
import { BaseController } from './BaseController';

export class UserController extends BaseController {
	public static get_by_id = async (
		request : Request<{ id: string }>,
		response : Response,
	) => {
		BaseController.get_by_id( request, response, User );
	};

	public static get_by_email = async (
		request : Request<{ email: string }>,
		response : Response,
	) => {
		const { email } = request.params;
		const errors = validationResult( request );
		if ( !errors.isEmpty() ) {
			response.status( 400 ).json( { error: 'Invalid email supplied' } );
			return;
		}
		const user = await User.findOne( { email } );

		if ( user ) {
			response.status( 200 ).send( user.toJSON() );
		} else {
			response.status( 404 ).json( { error: 'User not found' } );
		}
	};

	public static create = async (
		request : Request,
		response : Response,
	) => {
	// Destruct user details from request body
		const {
			display_name, email, password,
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
			tasks: [],
			projects: [],
		} );

		try {
			const saved_user = await user.save();

			response.status( 201 ).json( saved_user );
		} catch ( error : any ) {
			const { errors } = error;
			response.status( 400 ).json( { error: errors } );
		}
	};
}
