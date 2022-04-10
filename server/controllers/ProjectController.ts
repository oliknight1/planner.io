import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Project } from '../models/project';
import { ProjectSchema } from '../utils/types';
import { BaseController } from './BaseController';

export class ProjectController extends BaseController {
	public static get_project = async (
		request : Request<{ id: string }>,
		response : Response,
	) => {
		const { id } = request.params;

		if ( !mongoose.isValidObjectId( id ) ) {
			response.status( 400 ).json( { error: 'Invalid ID supplied' } );
			return;
		}
		const query = [
			{
				path: 'columns',
				populate: {
					path: 'tasks',
					populate: {
						path: 'users',
						select: 'display_name',
					},
				},
			},
			{
				path: 'users',
				select: [ 'display_name' ],
			},

		];
		const doc = await Project.findById( id ).populate( query );

		if ( doc ) {
			response.status( 200 ).send( doc.toJSON() );
		} else {
			response.status( 404 ).json( { error: 'Project not found' } );
		}
	};

	public static get_all_projects = async ( request : Request, response : Response ) => {
		const query = [
			{
				path: 'users',
				select: [ 'display_name' ],
			},
		];
		this.get_all( request, response, Project, query );
	};

	public static create = async (
		request : Request,
		response: Response,
	) => {
		const { title, users, columns } : ProjectSchema = request.body;

		const user_ids = users.map( ( user ) => user.id );
		const token = this.verify_token( request, response );
		if ( !token ) {
			response.status( 401 ).json( { error: 'Auth token missing or invalid' } );
			return;
		}

		if ( !title || title.length === 0 ) {
			response.status( 400 ).json( { error: 'title cannot be empty' } );
			return;
		}

		const project = new Project( {
			title,
			users: user_ids,
			columns,
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

	public static add_task = async (
		request : Request<{ id: string }>,
		response: Response,
	) => {
		const { id } = request.params;
		const { task_id } = request.body[0];
		if ( !mongoose.isValidObjectId( id ) ) {
			response.status( 400 ).json( { error: 'Invalid ID supplied' } );
			return;
		}

		const token = this.verify_token( request, response );
		if ( !token ) {
			response.status( 401 ).json( { error: 'Auth token missing or invalid' } );
			return;
		}

		const project = await Project.findById( id );
		if ( !project ) {
			response.status( 404 ).json( { error: 'Project not found' } );
			return;
		}
		const backlog_tasks = [
			...project.columns[0].tasks, new mongoose.Types.ObjectId( task_id ) ];

		project.columns[0].tasks = backlog_tasks;
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

	public static update = async (
		request: Request<{ id: string }>,
		response: Response,
	) => {
		const { id } = request.params;
		if ( !mongoose.isValidObjectId( id ) ) {
			response.status( 400 ).json( { error: 'Invalid ID supplied' } );
			return;
		}

		const token = this.verify_token( request, response );
		if ( !token ) {
			response.status( 401 ).json( { error: 'Auth token missing or invalid' } );
			return;
		}

		const project = await Project.findById( id );
		if ( !project ) {
			response.status( 404 ).json( { error: 'Project not found' } );
			return;
		}

		project.columns = request.body;

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
