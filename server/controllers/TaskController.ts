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
}
