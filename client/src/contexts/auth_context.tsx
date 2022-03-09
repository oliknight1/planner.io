import React, {
	createContext, FC, useContext, useMemo, useState,
} from 'react';
import { AuthController } from '../controllers/AuthController';
import { User, UserRequest } from '../utils/types';

const UserContext = createContext<any>( null );

// Custom hook to return context
export const useUser = () => useContext( UserContext );

export const UserProvider : FC = ( { children } ) => {
	const [ user, set_user ] = useState<User|null>( null );
	const [ error, set_error ] = useState<string>( '' );
	const [ loading, set_loading ] = useState<boolean>( false );

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

	const login = async ( { email, password } : UserRequest ) => {
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
