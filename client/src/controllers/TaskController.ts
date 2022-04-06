import axios from 'axios';
import { Task } from '../utils/types';

export class TaskController {
	public static update_task = async <T> ( token : string, task_id : string, data : T ) => {
		const headers = {
			Authorization: `Bearer ${token}`,
		};
		try {
			const response = await axios.patch( `/api/tasks/id/${task_id}`, data, { headers } );
			return response.data;
		} catch ( error : unknown ) {
			if ( axios.isAxiosError( error ) ) {
				return error.response?.data.error;
			}
			if ( error instanceof Error ) {
				return error.message;
			}
			throw new Error( 'Error updating task' );
		}
	};

	public static create = async ( token : string, data : Task ) => {
		const headers = {
			Authorization: `Bearer ${token}`,
		};
		try {
			const resposne = await axios.post( '/api/tasks', data, { headers } );
			return resposne;
		} catch ( error : unknown ) {
			if ( axios.isAxiosError( error ) ) {
				return error.response?.data.error;
			}
			if ( error instanceof Error ) {
				return error.message;
			}
			throw new Error( 'Error creating task' );
		}
	};
}
