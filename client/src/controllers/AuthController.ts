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

	private static verify_token = async ( token : string ) => {
		if ( !token ) return false;
		try {
			const headers = {
				Authorization: `Bearer ${token}`,
			};
			await axios.post( '/api/auth/verify-token', {}, { headers } );
			return true;
		} catch ( error : unknown ) {
			return false;
		}
	};

	public static get_auth = async () => {
		if ( window.localStorage.getItem( 'user' ) !== null ) {
			const auth = JSON.parse( window.localStorage.getItem( 'user' ) as string );
			const verified = await this.verify_token( auth.token );
			if ( !verified ) {
				window.localStorage.removeItem( 'user' );
				return null;
			}
			return auth;
		}
		return null;
	};
}
