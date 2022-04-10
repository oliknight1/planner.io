import { HamburgerIcon } from '@chakra-ui/icons';
import {
	Heading, IconButton, Box,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { useNav } from '../contexts/nav_context';
import { is_mobile_breakpoint } from '../utils/helpers';

interface ProjectTopContentProps {
	title: string,
}
const ProjectTopContent : FC<ProjectTopContentProps> = ( { title } ) => {
	const { toggle_state } = useNav();
	return (
		<Box px={6} py={6} textAlign="center" pos="relative" bg="black.900" maxW="100%">
			{
				is_mobile_breakpoint()
				&& (
					<IconButton
						pos="absolute"
						top="25%"
						left={6}
						variant="ghost"
						color="white"
						aria-label="Open navbar"
						icon={<HamburgerIcon w={6} h={6} />}
						onClick={toggle_state}
					/>
				)
			}
			<Heading fontWeight="normal" size="lg">{title}</Heading>
		</Box>
	);
};

export default ProjectTopContent;
