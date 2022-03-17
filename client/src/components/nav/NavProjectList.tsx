import React, { FC, useState } from 'react';
import {
	Avatar, Button, List, ListItem, Flex, Text, SlideFade, useColorMode,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import NavItem from './NavItem';

interface NavProjectProps {
	name : string
}
const NavProject : FC<NavProjectProps> = ( { name } ) => (
	<ListItem>
		<NavItem name={name} icon={<Avatar name={name} borderRadius="md" />} url="/projects/project_url" />
	</ListItem>
);

const NavProjectList : FC = () => {
	const [ open, set_open ] = useState<boolean>( false );
	const { colorMode } = useColorMode();
	const hover_styling = {
		backgroundColor: colorMode === 'dark' ? 'rgba(255,182,0,0.12)' : 'rgba(255,255,255,0.9)',
		color: colorMode === 'dark' ? 'white' : 'black',
	};
	return (
		<>
			<Button color="inherit" fontSize="2xl" variant="ghost" w="100%" mb={6} onClick={() => set_open( !open )} _hover={hover_styling}>
				<Flex justifyContent="space-between" w="100%">
					<Text>Projects</Text>
					<ChevronDownIcon />
				</Flex>
			</Button>
			<SlideFade in={open} offsetX={0} offsetY="-20px" reverse unmountOnExit>
				<List pl={2}>
					<NavProject name="Test Project" />
				</List>
			</SlideFade>
		</>
	);
};
export default NavProjectList;
