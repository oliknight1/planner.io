import { HamburgerIcon } from '@chakra-ui/icons';
import {
	Heading, Divider, IconButton, Box,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { useNav } from '../../contexts/nav_context';
import { ViewType } from '../../utils/enums';
import { is_mobile_breakpoint } from '../../utils/helpers';

interface ProjectTopContentProps {
	title: string,
	set_view: React.Dispatch<React.SetStateAction<ViewType>>,
	view: ViewType
}
const ProjectTopContent : FC<ProjectTopContentProps> = ( { title, set_view, view } ) => {
	const { toggle_state } = useNav();
	return (
		<>
			<Box px={6} py={6} textAlign="center" pos="relative" bg={is_mobile_breakpoint() ? 'black.900' : undefined} maxW="100%">
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
			<Divider borderColor="white" left={0} width="100%" orientation="horizontal" />
		</>
	);
};

export default ProjectTopContent;
