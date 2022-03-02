import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { Project } from '../models/project';
import { ProjectSchema } from '../utils/types';
import { BaseController } from './BaseController';

export class ProjectController extends BaseController {
	public static get_project = async (
		request : Request<{ id: string }>,
		response : Response,
	) => {
		this.get_by_id( request, response, Project );
	};

	public static create = async (
		request : Request,
		response: Response,
	) => {
		const { name } : ProjectSchema = request.body;

		if ( !this.verify_token( request ) ) {
			response.status( 401 ).json( { error: 'Auth token missing or invalid' } );
			return;
		}

		if ( name.length === 0 ) {
			response.status( 400 ).json( { error: 'Name cannot be empty' } );
			return;
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

	public static update = async (
		request: Request<{ id: string }>,
		response: Response,
	) => {
		const { id } = request.params;
		const { name } = request.body;
		if ( !isValidObjectId( id ) ) {
			response.status( 400 ).json( { error: 'Invalid ID supplied' } );
			return;
		}
		if ( name.length === 0 ) {
			response.status( 400 ).json( { error: 'No data provided' } );
			return;
		}
		if ( !this.verify_token( request ) ) {
			response.status( 401 ).json( { error: 'Auth token missing or invalid' } );
			return;
		}

		const project = await Project.findById( id );
		if ( !project ) {
			response.status( 404 ).json( { error: 'Project not found' } );
			return;
		}
		project.name = name;

		try {
			await project.save();
			response.status( 200 ).json( project );
		} catch ( error: unknown ) {
			if ( error instanceof Error ) {
				const { message } = error;
				response.status( 400 ).json( { error: message } );
			}
		}
	};

	public static remove_project = async (
		request : Request<{ id: string }>,
		response : Response,
	) => {
		this.remove( request, response, Project );
	};
}
