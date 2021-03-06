import { Request, Response } from 'express';
import { isValidObjectId, Types } from 'mongoose';
import { Project } from '../models/project';
import { Task } from '../models/task';
import { BaseController } from './BaseController';

export class TaskController extends BaseController {
	public static get_task = async (
		request : Request<{ id: string }>,
		response : Response,
	) => this.get_by_id( request, response, Task );

	public static remove_task = async (
		request : Request<{ id: string }>,
		response : Response,
	) => {
		this.remove( request, response, Task );
	};

	public static create = async ( request : Request, response : Response ) => {
		const data = request.body;
		if ( !data.title || data.title.length === 0 ) {
			response.status( 400 ).json( { error: 'Title cannot be empty' } );
			return;
		}

		const token = this.verify_token( request, response );
		if ( !token ) {
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

		const token = this.verify_token( request, response );
		if ( !token ) {
			response.status( 401 ).json( { error: 'Auth token missing or invalid' } );
			return;
		}

		const task = await Task.findById( id );
		if ( !task ) {
			response.status( 404 ).json( { error: 'Task not found' } );
			return;
		}
		if ( request.body.column ) {
			const col_id = new Types.ObjectId( request.body.column );
			task.column = col_id;
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
