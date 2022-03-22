import mongoose, { isValidObjectId } from 'mongoose';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/config';

export class BaseController {
	public static get_all = async <T, T2> (
		request : Request,
		response : Response,
		model: mongoose.Model<T, {}, {}, {}>,
		populate_tag?: string,
		populate_config?: T2,
	) => {
		const docs = populate_tag
			? await model.find().populate( populate_tag, populate_config || null )
			: await model.find();
		if ( docs ) {
			response.status( 200 ).json( docs );
		} else {
			response.status( 404 ).json( { error: `${model.modelName} not found` } );
		}
	};

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

		const token = this.verify_token( request, response );
		if ( !token ) {
			response.status( 401 ).json( { error: 'Auth token missing or invalid' } );
			return;
		}

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

	public static verify_token = ( request : Request, response : Response ) => {
		const auth = request.get( 'authorization' );
		if ( auth && auth.toLowerCase().startsWith( 'bearer ' ) ) {
			const token = auth.substring( 7 );
			// Check if token & env variable exist before verify

			const decoded_token = jwt.verify( token, JWT_SECRET as string );

			if ( !decoded_token ) {
				response.status( 401 ).json( { error: 'Token expired' } );
				return null;
			}
			return decoded_token as jwt.JwtPayload;
		}
		return null;
	};
}
