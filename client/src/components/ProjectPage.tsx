import { Container, Heading } from '@chakra-ui/react';
import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectController } from '../controllers/ProjectController';
import { Project } from '../utils/types';

const ProjectPage : FC = () => {
	const navigate = useNavigate();
	const params = useParams();

	if ( !params.id ) {
		// Redirect to 404 page
		navigate( '/*' );
	}
	const {
		data, isError,
	} = useQuery<Project, Error>( 'single_project', () => ProjectController.get_by_id( params.id as string ) );

	if ( !isError || !data ) {
		// Redirect to 404 page
		navigate( '/*' );
		return null;
	}
	return (
		<Container>
			<Heading>{data.title}</Heading>
		</Container>
	);
};

export default ProjectPage;
