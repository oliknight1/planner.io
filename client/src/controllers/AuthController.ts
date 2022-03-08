import axios from 'axios';

export class AuthController {
	private static error : string = '';

	private static add_error = ( error : string ) => {
		this.error = error;
	};

	public static get_error = () => this.error;

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
			.then( ( response ) => {
				window.localStorage.setItem( 'user', JSON.stringify( response.data ) );
			} )
			.catch( ( err ) => this.add_error( err.response.data.error ) );
	};

	public static login = async ( email : string, password : string ) => {
		await axios.post( '/api/auth/login', { email, password } )
			.then( ( response ) => {
				window.localStorage.setItem( 'user', JSON.stringify( response.data ) );
			} )
			.catch( ( err ) => this.add_error( err.response.data.error ) );
	};
}
