import { Flex } from '@chakra-ui/react';
import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { NavProvider } from '../contexts/nav_context';
import Nav from './nav/Nav';

const Home : FC = () => (
	<NavProvider>
		<Flex>
			<Nav />
			<Outlet />
		</Flex>
	</NavProvider>
);
export default Home;
