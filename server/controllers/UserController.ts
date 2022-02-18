import mongoose, { isValidObjectId } from 'mongoose';
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
}
