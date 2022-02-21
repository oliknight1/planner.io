import { isValidObjectId } from 'mongoose';
import { validationResult } from 'express-validator';
import { Request, Response } from 'express';
import { User } from '../models/user';

export class UserController {
	public static get_by_id = async ( request : Request<{ id: string }>, response : Response ) => {
		const { id } = request.params;

		if ( !isValidObjectId( id ) ) {
			response.status( 400 ).json( { error: 'Invalid ID supplied' } );
		}
		const user = await User.findById( id );

		if ( user ) {
			response.status( 200 ).send( user.toJSON() );
		} else {
			response.status( 404 ).json( { error: 'User not found' } );
		}
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
