import axios from 'axios';

export class AuthController {
	private static errors : string[] = [];

	private static add_error = ( error : string ) => {
		this.errors.push( error );
	};

	public static get_errors = () => this.errors;

	public static register = async (
		display_name : string,
		email : string,
		password : string,
		password_confirm : string,
	) => {
		const data = {
			display_name,
			email,
			password,
			password_confirm,
		};
		await axios.post( '/api/auth/register', data )
			.catch( ( err ) => {
				this.add_error( err.response.data.error );
			} );
	};
}
