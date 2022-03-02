import { validationResult } from 'express-validator';
import { Request, Response } from 'express';
import { User } from '../models/user';
import { BaseController } from './BaseController';

export class UserController extends BaseController {
	public static get_user = async (
		request : Request<{ id: string }>,
		response : Response,
	) => {
		this.get_by_id( request, response, User );
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
}
