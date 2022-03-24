import {
	Box, Center, Container,
	Divider, Flex, IconButton, List, ListIcon, As, SlideFade, useColorMode, Switch, FormControl,
} from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import Logo from '../Logo';
import { is_mobile_breakpoint } from '../../utils/helpers';
import { AllProjectsIcon, HomeIcon } from '../../utils/icons';
import { NavLink } from '../../utils/types';
import NavItem from './NavItem';
import NavProjectList from './NavProjectList';

const Nav : FC = () => {
	const [ open, set_open ] = useState<boolean>( true );
	const { colorMode, toggleColorMode } = useColorMode();

	const links : NavLink[] = [
		{
			name: 'Home',
			icon: HomeIcon,
			url: '/',
		},
		{
			name: 'All Projects',
			icon: AllProjectsIcon,
			url: 'projects',
		},
	];
	return (
		<SlideFade in={open} offsetX="-200px" offsetY={0} unmountOnExit>
			<Box
				pos="relative"
				maxH="100vh"
				h="100vh"
				w={is_mobile_breakpoint() ? '100%' : 'sm'}
				background={colorMode === 'dark' ? 'black.900' : 'brand.dark_blue'}
				color="white"
			>
				<Container pt={3}>
					<Flex w="100%" alignItems="center" justifyContent="space-around">
						<Box w={is_mobile_breakpoint() ? '50%' : '60%'}>
							<Logo />
						</Box>
						<IconButton
							aria-label="Close navigaton"
							variant="ghost"
							color="yellow.200"
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
									icon={<ListIcon as={link.icon as As<any>} w={8} h={8} />}
									url={link.url}
								/>
							) )
						}
					</List>
					<Center py={10}>
						<Divider orientation="horizontal" borderColor="white" />
					</Center>
					<Box overflowY="auto" overflowX="hidden" h="50vh">
						<NavProjectList />
					</Box>
				</Container>
				<FormControl display="flex" justifyContent="space-around" alignItems="center" position="absolute" bottom={6} right={6} width="fit-content">
					<SunIcon w={6} h={6} color={colorMode === 'light' ? 'yellow.200' : 'white'} />
					<Switch mx={4} size="md" defaultChecked colorScheme="yellow" onChange={toggleColorMode} />
					<MoonIcon w={6} h={6} color={colorMode === 'dark' ? 'yellow.200' : 'white'} />
				</FormControl>

			</Box>
		</SlideFade>
	);
};

export default Nav;
