import {
	As, Box, Center, Container,
	Divider, Flex, IconButton,
	Link, List, ListIcon, ListItem,
} from '@chakra-ui/react';
import React, { FC, ReactElement, useState } from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import Logo from './Logo';
import { is_mobile_breakpoint } from '../utils/helpers';
import { AllProjectsIcon, HomeIcon } from '../utils/icons';

interface NavLink {
	name: string,
	icon : As<any> | ReactElement
	url: string
}

const MotionBox = motion( Box );

const NavItem : FC<NavLink> = ( { name, icon, url } : NavLink ) => (
	// TODO: Imporve hover styling
	<ListItem>
		<Link href={url} fontSize="2xl">
			<ListIcon as={icon as As<any>} h={8} w={8} mr={5} />
			{ name }
		</Link>
	</ListItem>
);

const Nav : FC = () => {
	const [ open, set_open ] = useState<boolean>( true );

	const variants = {
		closed: { x: -500 },
		open: { x: 0 },
	};

	const links : NavLink[] = [
		{
			name: 'Home',
			icon: HomeIcon,
			url: '/',
		},
		{
			name: 'All Projects',
			icon: AllProjectsIcon,
			url: '/projects',
		},
	];

	return (
		<MotionBox h="100vh" maxW={is_mobile_breakpoint() ? '100%' : 'sm'} background="black.900" variants={variants} animate={open ? 'open' : 'closed'}>
			<Container pt={3}>
				<Flex w="100%" alignItems="center" justifyContent="space-around">
					<Box w={is_mobile_breakpoint() ? '50%' : '60%'}>
						<Logo />
					</Box>
					<IconButton
						aria-label="Close navigaton"
						variant="ghost"
						icon={<CloseIcon w={5} h={5} />}
						onClick={() => set_open( false )}
					/>
				</Flex>
				<Center py={10}>
					<Divider orientation="horizontal" borderColor="white" />
				</Center>
				<List spacing={10} pl={4}>
					{
						links.map( ( link : NavLink ) => (
							<NavItem
								key={link.url}
								name={link.name}
								icon={link.icon}
								url={link.url}
							/>
						) )
					}
				</List>
			</Container>
		</MotionBox>
	);
};

export default Nav;
