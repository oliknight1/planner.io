import axios from 'axios';

export class ProjectController {
	public static get_all = async () => {
		const response = await axios.get( '/api/projects' );
		return response.data;
	};

	public static get_by_id = async ( id: string ) => {
		const response = await axios.get( `/api/projects/id/${id}` );
		return response.data;
	};
}
