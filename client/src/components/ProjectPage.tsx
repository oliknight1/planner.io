import { Container, Heading } from '@chakra-ui/react';
import React, { FC, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectController } from '../controllers/ProjectController';
import { Project } from '../utils/types';

const ProjectPage : FC = () => {
	const navigate = useNavigate();
	const params = useParams();

	useEffect( () => {
		if ( !params.id ) {
		// Redirect to 404 page
			navigate( '/*' );
		}
	}, [] );

	const {
		data,
	} = useQuery<Project, Error>( 'single_project', () => ProjectController.get_by_id( params.id as string ) );

	return (
		<Container>
			<Heading>{data?.title}</Heading>
		</Container>
	);
};

export default ProjectPage;
