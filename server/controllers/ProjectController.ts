import { Request, Response } from 'express';
import { Project } from '../models/project';
import { BaseController } from './BaseController';

export class ProjectController extends BaseController {
	public static get_by_id = async (
		request : Request<{ id: string }>,
		response : Response,
	) => {
		BaseController.get_by_id( request, response, Project );
	};
}
