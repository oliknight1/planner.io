import { Flex } from '@chakra-ui/react';
import React, { FC, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { NavProvider } from '../contexts/nav_context';
import Nav from './nav/Nav';

const Home : FC = () => {
	const navigate = useNavigate();
	useEffect( () => navigate( '/projects' ), [] );
	return (
		<NavProvider>
			<Flex>
				<Nav />
				<Outlet />
			</Flex>
		</NavProvider>
	);
};
export default Home;
