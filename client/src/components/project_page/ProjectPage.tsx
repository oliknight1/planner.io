import {
	Box, Flex,
} from '@chakra-ui/react';
import React, { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProject } from '../../utils/hooks';
import TopBar from '../TopBar';
import ProjectPageBody from './ProjectPageBody';

const ProjectPage : FC = () => {
	const navigate = useNavigate();
	const params = useParams();

	useEffect( () => {
		if ( !params.id ) {
		// Redirect to 404 page
			navigate( '/*' );
		}
	}, [] );

	const { data, isError } = useProject();

	if ( isError ) {
		navigate( '/*' );
		return null;
	}
	if ( data ) {
		return (
			<Flex flexDirection="column" pos="relative" w="100%">
				<TopBar title={data.title} is_project_page />
				<Box>
					<ProjectPageBody project_id={data.id} columns={data.columns} users={data.users} />
				</Box>
			</Flex>
		);
	}
	return null;
};

export default ProjectPage;
