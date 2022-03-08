import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { UserSchema } from '../utils/types';

export class AuthController {
	public static login = async (
		request: Request,
		response: Response,
	) => {
		const { email, password } = request.body;

		const user = await User.findOne( { email } );

		// If user doesnt exist, value will be false and will not check password
		const correct_password = user === null
			? false : await bcrypt.compare( password, user.password );

		if ( !user || !correct_password ) {
			response.status( 401 ).json( { error: 'Incorrect email or password' } );
			return;
		}
		const token_data = {
			display_name: user.display_name,
			id: user.id,
		};

		const token = jwt.sign( token_data, process.env.JWT_SECRET as string, {
			expiresIn: process.env.JWT_EXPIRES_IN,
		} );

		response.status( 200 ).send( {
			token,
			display_name: user.display_name,
			id: user.id,
		} );
		console.log( 'successful login' );
	};

	public static create = async (
		request : Request,
		response : Response,
	) => {
		const {
			display_name, email, password, password_confirm,
		} : UserSchema = request.body;

		const user_exists = await User.findOne( { email } );

		if ( user_exists ) {
			response.status( 400 ).json( {
				error: 'Account with that email already exists',
			} );
			return;
		}

		if ( password !== password_confirm ) {
			response.status( 400 ).json( { error: 'Passwords do not match' } );
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

			const token_data = {
				display_name: saved_user.display_name,
				id: saved_user.id,
			};

			const token = jwt.sign( token_data, process.env.JWT_SECRET as string, {
				expiresIn: process.env.JWT_EXPIRES_IN,
			} );

			response.status( 201 ).send( {
				token,
				display_name: user.display_name,
				id: user.id,
			} );
		} catch ( error : unknown ) {
			if ( error instanceof Error ) {
				const { message } = error;
				response.status( 400 ).json( { error: message } );
			}
		}
	};
}
