import axios from 'axios';
import { User } from '../utils/types';

export class AuthController {
	private static error : string = '';

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
		return this.handle_request( '/api/auth/register', data );
	};

	public static login = (
		email : string,
		password : string,
	) : Promise<User | string> => this.handle_request( '/api/auth/login', { email, password } );

	private static handle_request = async <T> ( url : string, data : T ) => {
		try {
			const response = await axios.post( url, { ...data } );
			window.localStorage.setItem( 'user', JSON.stringify( response.data ) );
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

	public static get_auth = () => {
		if ( window.localStorage.getItem( 'user' ) !== null ) {
			return JSON.parse( window.localStorage.getItem( 'user' ) as string );
		}
		return null;
	};
}
