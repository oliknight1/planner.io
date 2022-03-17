import React, { FC, useState } from 'react';
import {
	Avatar, Button, List, Text, SlideFade, useColorMode, Flex,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import axios from 'axios';
import NavItem from './NavItem';
import { Project } from '../../utils/types';

const get_projects = async () : Promise<Project[]> => {
	const response = await axios.get( '/api/projects' );
	return response.data;
};

const NavProjectList : FC = () => {
	const [ open, set_open ] = useState<boolean>( false );
	const { colorMode } = useColorMode();
	const hover_styling = {
		backgroundColor: colorMode === 'dark' ? 'rgba(255,182,0,0.12)' : 'rgba(255,255,255,0.9)',
		color: colorMode === 'dark' ? 'white' : 'black',
	};

	const {
		data, error, status,
	} = useQuery<Project[], Error>( 'projects', get_projects );

	const render_list = () => {
		switch ( status ) {
		case 'loading':
			return 'loading';
		case 'error':
			return error.message;
		case 'success':
			return data.map( ( project ) => (
				<NavItem
					name={project.title}
					icon={<Avatar name={project.title} borderRadius="md" />}
					url={encodeURI( `/projects/${project.title}` )}
				/>
			) );
		default:
			return null;
		}
	};

	return (
		<>
			<Button color="inherit" fontSize="2xl" variant="ghost" w="100%" mb={6} onClick={() => set_open( !open )} _hover={hover_styling}>
				<Flex justifyContent="space-between" w="100%">
					<Text>Projects</Text>
					<ChevronDownIcon />
				</Flex>
			</Button>
			<SlideFade in={open} offsetX={0} offsetY="-20px" reverse>
				<List pl={2}>
					{ render_list() }
					<Button w="100%" mt={8} variant="outline" colorScheme="yellow" rightIcon={<AddIcon ml={4} />}>New Project</Button>
				</List>
			</SlideFade>
		</>
	);
};
export default NavProjectList;
