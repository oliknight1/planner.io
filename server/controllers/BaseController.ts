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
			return;
		}
		const doc = await model.findById( id );

		if ( doc ) {
			response.status( 200 ).send( doc.toJSON() );
		} else {
			response.status( 404 ).json( { error: `${model.modelName} not found` } );
		}
	};

	public static remove = async <T>(
		request : Request<{ id: string }>,
		response : Response,
		model: mongoose.Model<T, {}, {}, {}>,
	) => {
		const { id } = request.params;

		if ( !isValidObjectId( id ) ) {
			response.status( 400 ).json( { error: 'Invalid ID supplied' } );
			return;
		}
		try {
			await model.findByIdAndRemove( id );
			response.status( 204 ).end();
		} catch ( error : unknown ) {
			if ( error instanceof Error ) {
				response.status( 400 ).json( { error: error.message } );
			}
		}
	};
}
