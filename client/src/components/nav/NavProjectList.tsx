import React, { FC, useState } from 'react';
import {
	Avatar, Button, List, ListItem, Flex, Text, SlideFade,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import NavItem from './NavItem';

const NavProject = () => (
	<ListItem>
		<NavItem name="Project name" icon={<Avatar name="Project name" borderRadius="md" />} url="/projects/project_url" />
	</ListItem>
);

const NavProjectList : FC = () => {
	const [ open, set_open ] = useState<boolean>( false );
	return (
		<>
			<Button fontSize="2xl" shadow="none" variant="ghost" w="100%" color="white" mb={6} onClick={() => set_open( !open )}>
				<Flex justifyContent="space-between" w="100%">
					<Text>Projects</Text>
					<ChevronDownIcon />
				</Flex>
			</Button>
			<SlideFade in={open} offsetX={0} offsetY="-20px" reverse unmountOnExit>
				<List pl={2}>
					<NavProject />
				</List>
			</SlideFade>
		</>
	);
};
export default NavProjectList;
