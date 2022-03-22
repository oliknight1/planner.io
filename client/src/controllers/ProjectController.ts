import axios from 'axios';

export class ProjectController {
	public static get_all = async () => {
		const response = await axios.get( '/api/projects' );
		return response.data;
	};
}
