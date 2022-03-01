import { Request, Response } from 'express';
import { Task } from '../models/task';
import { BaseController } from './BaseController';

export class TaskController {
	public static get_by_id = async (
		request : Request<{ id: string }>,
		response : Response,
	) => BaseController.get_by_id( request, response, Task );

	public static remove = async (
		request : Request<{ id: string }>,
		response : Response,
	) => {
		BaseController.remove( request, response, Task );
	};

	public static create = async ( request : Request, response : Response ) => {
		const data = request.body;
		if ( !data.title || data.title.length === 0 ) {
			response.status( 400 ).json( { error: 'Title cannot be empty' } );
			return;
		}

		const task = new Task( {
			...data,
		} );

		try {
			const saved_task = await task.save();
			response.status( 201 ).json( saved_task );
		} catch ( error : unknown ) {
			if ( error instanceof Error ) {
				const { message } = error;
				response.status( 400 ).json( { error: message } );
			}
		}
	};
}
