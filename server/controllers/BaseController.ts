import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { UserSchema } from '../utils/types';

export class BaseController {
	public static get_one = async (
		model : mongoose.Model<UserSchema, {}, {}, {}>,
		search_item : any,
		request : Request,
		response : Response,
	) => {
		const item = await model.findOne( search_item );
		if ( item ) {
			response.status( 200 ).json( item.toJSON() );
		} else {
			response.status( 400 ).end();
		}
	};
}
