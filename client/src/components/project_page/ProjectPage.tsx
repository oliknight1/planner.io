import {
	Box, Container,
} from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectController } from '../../controllers/ProjectController';
import { ViewType } from '../../utils/enums';
import { Project } from '../../utils/types';
import ProjectPageBody from './ProjectPageBody';
import ProjectTopContent from './ProjectTopContent';

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
					<ProjectPageBody project_id={data.id} columns={data.columns} />
				</Box>
			</Container>
		);
	}
	return null;
};

export default ProjectPage;
