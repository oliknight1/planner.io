import {
	Flex, Heading, Divider,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { ViewType } from '../../utils/enums';
import { is_mobile_breakpoint } from '../../utils/helpers';
import ViewSwitcher from '../ViewSwitcher';

interface ProjectTopContentProps {
	title: string,
	set_view: React.Dispatch<React.SetStateAction<ViewType>>,
	view: ViewType
}
const ProjectTopContent : FC<ProjectTopContentProps> = ( { title, set_view, view } ) => (
	<>
		<Flex px={6} py={6} justifyContent="space-between" bg={is_mobile_breakpoint() ? 'black.900' : undefined} maxW="100%">
			<Heading fontWeight="normal" size="lg">{title}</Heading>
			<ViewSwitcher view={view} set_view={set_view} />
		</Flex>
		<Divider borderColor="white" left={0} width="100%" orientation="horizontal" />
	</>
);

export default ProjectTopContent;
