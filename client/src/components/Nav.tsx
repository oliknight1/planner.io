import {
	As, Box, Button, Center, Container,
	Divider, Flex, IconButton, Text,
	Link, List, ListIcon, ListItem, LinkBox,
} from '@chakra-ui/react';
import React, { FC, ReactElement, useState } from 'react';
import { ChevronDownIcon, CloseIcon } from '@chakra-ui/icons';
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
	<LinkBox>
		<Link href={url} variant="ghost" fontSize="2xl">
			<ListItem px={4} py={2} _hover={{ backgroundColor: 'rgba(255, 195, 46, 0.12)', color: 'white' }} borderRadius="md">
				<ListIcon as={icon as As<any>} h={8} w={8} mr={5} />
				{ name }
			</ListItem>
		</Link>
	</LinkBox>
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
				<List spacing={8} pl={4} variant="ghost">
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
				<Center py={10}>
					<Divider orientation="horizontal" borderColor="white" />
				</Center>
				<Button fontSize="2xl" variant="ghost" w="100%">
					<Flex justifyContent="space-between" w="100%">
						<Text>Projects</Text>
						<ChevronDownIcon />
					</Flex>

				</Button>
			</Container>
		</MotionBox>
	);
};

export default Nav;
