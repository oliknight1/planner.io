import { Container, Heading } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { ProjectController } from '../controllers/ProjectController';
import { Project } from '../utils/types';

const ProjectPage = () => {
	const params = useParams();
	if ( !params.id ) {
		// Redirect to 404 page
		return null;
	}
	const {
		data, isError,
	} = useQuery<Project, Error>( 'single_project', () => ProjectController.get_by_id( params.id as string ) );

	if ( isError || !data ) {
		// Redirect to 404 page
		return null;
	}
	return (
		<Container>
			<Heading>{data.title}</Heading>
		</Container>
	);
};

export default ProjectPage;
