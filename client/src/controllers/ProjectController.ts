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
		};
		return axios.post( '/api/projects', post_data, { headers } );
	};
}
