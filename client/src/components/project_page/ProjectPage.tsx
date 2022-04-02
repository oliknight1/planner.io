import {
	Box, Flex,
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
			<Flex flexDirection="column" pos="relative" w="100%">
				<ProjectTopContent view={view} set_view={set_view} title={data.title} />
				<Box>
					<ProjectPageBody project_id={data.id} columns={data.columns} />
				</Box>
			</Flex>
		);
	}
	return null;
};

export default ProjectPage;
