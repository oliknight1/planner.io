import mongoose, { isValidObjectId } from 'mongoose';
import { Request, Response } from 'express';

export class BaseController {
	public static get_by_id = async <T>(
		request : Request<{ id: string }>,
		response : Response,
		model: mongoose.Model<T, {}, {}, {}>,
	) => {
		const { id } = request.params;

		if ( !isValidObjectId( id ) ) {
			response.status( 400 ).json( { error: 'Invalid ID supplied' } );
		}
		const user = await model.findById( id );

		if ( user ) {
			response.status( 200 ).send( user.toJSON() );
		} else {
			response.status( 404 ).json( { error: `${model.modelName} not found` } );
		}
	};
}
