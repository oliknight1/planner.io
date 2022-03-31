import axios from 'axios';

export class TaskController {
	public static update_task = async <T> ( token : string, task_id : string, data : T ) => {
		const headers = {
			Authorization: `Bearer ${token}`,
		};
		try {
			console.log( data, task_id );
			const response = await axios.patch( `/api/tasks/id/${task_id}`, data, { headers } );
			return response.data;
		} catch ( error : unknown ) {
			if ( axios.isAxiosError( error ) ) {
				return error.response?.data.error;
			}
			if ( error instanceof Error ) {
				return error.message;
			}
			throw new Error( 'Error logging in' );
		}
	};
}
