import React, { FC, useState } from 'react';
import {
	Avatar, Button, List, Text, SlideFade, useColorMode, Flex, useDisclosure,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import NavItem from './NavItem';
import { Project } from '../../utils/types';
import NewProjectDialog from './NewProjectDialog';
import { ProjectController } from '../../controllers/ProjectController';

const NavProjectList : FC = () => {
	const [ open, set_open ] = useState<boolean>( false );
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { colorMode } = useColorMode();
	const hover_styling = {
		backgroundColor: colorMode === 'dark' ? 'rgba(255,182,0,0.12)' : 'rgba(255,255,255,0.9)',
		color: colorMode === 'dark' ? 'white' : 'black',
	};

	const {
		data, error, status,
	} = useQuery<Project[], Error>( 'projects', ProjectController.get_all );

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
					key={project.id}
				/>
			) );
		default:
			return null;
		}
	};

	return (
		<>
			<Button
				color="inherit"
				fontSize="2xl"
				variant="ghost"
				w="100%"
				mb={6}
				onClick={() => set_open( !open )}
				_hover={hover_styling}
			>
				<Flex justifyContent="space-between" w="100%">
					<Text>Projects</Text>
					<ChevronDownIcon />
				</Flex>
			</Button>
			<SlideFade in={open} offsetX={0} offsetY="-20px" reverse unmountOnExit>
				<List pl={2}>
					{ render_list() }
					<Button
						w="100%"
						mt={8}
						variant="outline"
						colorScheme="yellow"
						rightIcon={<AddIcon ml={4} />}
						onClick={onOpen}
						_hover={{ backgroundColor: 'rgba(255,182,0,0.12)' }}
					>
						New Project
					</Button>
				</List>
			</SlideFade>
			<NewProjectDialog is_open={isOpen} on_close={onClose} />
		</>
	);
};
export default NavProjectList;
