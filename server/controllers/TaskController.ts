import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { Task } from '../models/task';
import { BaseController } from './BaseController';

export class TaskController extends BaseController {
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
		if ( !this.verify_token( request ) ) {
			response.status( 401 ).json( { error: 'Auth token missing or invalid' } );
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

	public static update = async (
		request: Request<{ id: string }>,
		response: Response,
	) => {
		const { id } = request.params;
		if ( !isValidObjectId( id ) ) {
			response.status( 400 ).json( { error: 'Invalid ID supplied' } );
			return;
		}
		if ( !this.verify_token( request ) ) {
			response.status( 401 ).json( { error: 'Auth token missing or invalid' } );
			return;
		}

		const task = await Task.findById( id );
		if ( !task ) {
			response.status( 404 ).json( { error: 'Tasl not found' } );
			return;
		}

		Object.keys( request.body ).reduce( ( request_task : any, key ) => {
			const updated_task = request_task;
			updated_task[key] = request.body[key];
			return updated_task;
		}, task );

		if ( task ) {
			try {
				await task.save();
				response.status( 200 ).json( task );
				return;
			} catch ( error : unknown ) {
				if ( error instanceof Error ) {
					const { message } = error;
					response.status( 400 ).json( { error: message } );
					return;
				}
			}
		}
		response.status( 404 ).end();
	};
}
