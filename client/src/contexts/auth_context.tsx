import React, {
	createContext, FC, useContext, useEffect, useMemo, useState,
} from 'react';
import { AuthController } from '../controllers/AuthController';
import { User } from '../utils/types';

const UserContext = createContext<any>( null );

// Custom hook to return context
export const useUser = () => useContext( UserContext );

export const UserProvider : FC = ( { children } ) => {
	const [ user, set_user ] = useState<User|null>();
	const [ error, set_error ] = useState<string>( '' );
	const [ loading, set_loading ] = useState<boolean>( false );

	useEffect( () => {
		set_loading( true );
		const get_auth = async () => {
			const auth = await AuthController.get_auth();
			set_user( auth );
		};
		get_auth();
		set_loading( false );
	}, [] );

	const handle_response = ( response : User | string ) => {
		if ( typeof response === 'string' ) {
			set_error( response );
			return;
		}
		// User type
		if ( 'token' in response ) {
			set_user( response );
		}
	};

	const register = async (
		display_name : string,
		email : string,
		password : string,
		password_confirm : string,
	) => {
		set_loading( true );
		const response : User | string = await AuthController.register(
			display_name!,
			email,
			password,
			password_confirm!,
		);
		handle_response( response );
		set_loading( false );
	};

	const login = async ( email : string, password : string ) => {
		set_loading( true );
		const response : User | string = await AuthController.login( email, password );
		handle_response( response );
		set_loading( false );
	};

	// returns a memorized value, faster than using object
	const value = useMemo( () => ( {
		user, register, login, error, loading,
	} ), [ set_user, register, login, set_error, set_loading ] );

	return (
		<UserContext.Provider value={value}>
			{ children }
		</UserContext.Provider>
	);
};
