import axios from 'axios';
import { User } from '../utils/types';

export class ProjectController {
	public static get_all = async () => {
		const response = await axios.get( '/api/projects' );
		return response.data;
	};

	public static get_by_id = async ( id: string ) => {
		const response = await axios.get( `/api/projects/id/${id}` );
		return response.data;
	};

	public static create = ( token : string, title : string, users : User[] ) => {
		const headers = {
			Authorization: `Bearer ${token}`,
		};
		const post_data = {
			title,
			users,
			columns: [
				{
					title: 'Backlog',
					tasks: [],
				},
				{
					title: 'In Progress',
					tasks: [],
				},
				{
					title: 'Completed',
					tasks: [],
				},
			],
		};
		return axios.post( '/api/projects', post_data, { headers } );
	};

	public static add_task = async ( token : string, project_id : string, task_id : string ) => {
		const headers = {
			Authorization: `Bearer ${token}`,
		};
		const data = {
			task_id,
		};
		try {
			const response = await axios.patch( `/api/projects/add_task/${project_id}`, [ data ], { headers } );
			return response.data;
		} catch ( error : unknown ) {
			if ( axios.isAxiosError( error ) ) {
				return error.response?.data.error;
			}
			if ( error instanceof Error ) {
				return error.message;
			}
			throw new Error( 'Error updating project' );
		}
	};

	public static update = async <T> ( token : string, data : T, project_id : string ) => {
		const headers = {
			Authorization: `Bearer ${token}`,
		};
		try {
			const response = await axios.patch( `/api/projects/id/${project_id}`, data, { headers } );
			return response.data;
		} catch ( error : unknown ) {
			if ( axios.isAxiosError( error ) ) {
				return error.response?.data.error;
			}
			if ( error instanceof Error ) {
				return error.message;
			}
			throw new Error( 'Error updating project' );
		}
	};
}
