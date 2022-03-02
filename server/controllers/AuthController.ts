import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../models/user';

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
			response.status( 401 ).json( { error: 'Invalid email or password' } );
			return;
		}
		const token_data = {
			display_name: user.display_name,
			id: user.id,
		};

		if ( process.env.JWT_SECRET ) {
			const token = jwt.sign( token_data, process.env.JWT_SECRET, {
				expiresIn: process.env.JWT_EXPIRES_IN,
			} );

			response.status( 200 ).send( {
				token,
				display_name: user.display_name,
				id: user.id,
			} );
		}
	};
}
