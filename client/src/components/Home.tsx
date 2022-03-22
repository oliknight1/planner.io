import { Flex } from '@chakra-ui/react';
import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './nav/Nav';

const Home : FC = () => (
	<Flex>
		<Nav />
		<Outlet />
	</Flex>
);
export default Home;
