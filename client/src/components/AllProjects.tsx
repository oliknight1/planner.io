import {
	Center, Container, Wrap, Spinner, WrapItem,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { ProjectController } from '../controllers/ProjectController';
import { Project } from '../utils/types';
import ProjectCard from './ProjectCard';

export const AllProjects : FC = () => {
	const {
		data, isLoading, isSuccess,
	} = useQuery<Project[], Error>( 'projects', ProjectController.get_all );
	return (
		<Container maxW="100%" py={6}>
			{
				isLoading
				&& <Center w="100%" h="100%"><Spinner size="xl" color="yellow.300" /></Center>
			}
			{
				isSuccess
				&& (
					<Wrap spacing={5}>
						{data.map( ( project ) => (
							<WrapItem key={project.id}>
								<ProjectCard title={project.title} users={project.users} />
							</WrapItem>
						) )}
					</Wrap>
				)
			}
		</Container>
	);
};

export default AllProjects;
