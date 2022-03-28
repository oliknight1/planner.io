import {
	Box, Container, Divider, Heading, Flex, Grid,
} from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectController } from '../controllers/ProjectController';
import { ViewType } from '../utils/enums';
import { Project } from '../utils/types';
import ViewSwitcher from './ViewSwitcher';

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

const ProjectPage : FC = () => {
	const [ view, set_view ] = useState<ViewType>( ViewType.Grid );
	const navigate = useNavigate();
	const params = useParams();

	useEffect( () => {
		if ( !params.id ) {
		// Redirect to 404 page
			navigate( '/*' );
		}
	}, [] );

	const {
		data, isError,
	} = useQuery<Project, Error>( 'single_project', () => ProjectController.get_by_id( params.id as string ) );

	if ( isError ) {
		navigate( '/*' );
		return null;
	}
	if ( data ) {
		return (
			<Container maxW="100%" pos="relative">
				<Box>
					<ProjectTopContent view={view} set_view={set_view} title={data.title} />
				</Box>
				<Box>
					<Grid templateColumns="repeat( 3, 1fr )">
						<Box>
							<Box>Backlog</Box>
						</Box>
						<Box>
							In Progress
						</Box>
						<Box>
							Completed
						</Box>
					</Grid>
				</Box>
			</Container>
		);
	}
	return null;
};

export default ProjectPage;
