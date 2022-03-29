import { Flex, Heading, Divider } from '@chakra-ui/react';
import React, { FC } from 'react';
import { ViewType } from '../../utils/enums';
import ViewSwitcher from '../ViewSwitcher';

interface ProjectTopContentProps {
	title: string,
	set_view: React.Dispatch<React.SetStateAction<ViewType>>,
	view: ViewType
}
const ProjectTopContent : FC<ProjectTopContentProps> = ( { title, set_view, view } ) => (
	<>
		<Flex py={6} justifyContent="space-between">
			<Heading>{title}</Heading>
			<ViewSwitcher view={view} set_view={set_view} />
		</Flex>
		<Divider pos="absolute" left={0} width="100%" orientation="horizontal" />
	</>
);

export default ProjectTopContent;
