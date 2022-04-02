import React, {
	createContext, FC, useContext, useEffect, useMemo, useState,
} from 'react';
import { is_mobile_breakpoint } from '../utils/helpers';

const NavContext = createContext<any>( null );

export const useNav = () => useContext( NavContext );

export const NavProvider : FC = ( { children } ) => {
	const [ open, set_open ] = useState<boolean>( false );

	const is_mobile = is_mobile_breakpoint();
	useEffect( () => {
		set_open( !is_mobile );
	}, [ is_mobile ] );

	const toggle_state = () => set_open( !open );

	const value = useMemo( () => ( {
		open, toggle_state,
	} ), [ set_open, toggle_state ] );

	return (
		<NavContext.Provider value={value}>
			{ children }
		</NavContext.Provider>
	);
};
