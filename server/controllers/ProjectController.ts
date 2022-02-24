import { Request, Response } from 'express';
import { Project } from '../models/project';
import { ProjectSchema } from '../utils/types';
import { BaseController } from './BaseController';

export class ProjectController extends BaseController {
	public static get_by_id = async (
		request : Request<{ id: string }>,
		response : Response,
	) => {
		BaseController.get_by_id( request, response, Project );
	};

	public static create = async (
		request : Request,
		response: Response,
	) => {
		const { name } : ProjectSchema = request.body;

		if ( name.length === 0 ) {
			return response.status( 400 ).json( { error: 'Name cannot be empty' } );
		}

		const project = new Project( {
			name,
			tasks: [],
			users: [],
		} );

		try {
			const saved_project = await project.save();
			response.status( 201 ).json( saved_project );
		} catch ( error : unknown ) {
			if ( error instanceof Error ) {
				const { message } = error;
				response.status( 400 ).json( { error: message } );
			}
		}
	};
}
