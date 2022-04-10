import {
	Center, Container, Wrap, Spinner, WrapItem, Fade, Box, Flex,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { ProjectController } from '../controllers/ProjectController';
import { Project } from '../utils/types';
import ProjectCard from './ProjectCard';
import TopBar from './TopBar';

export const AllProjects : FC = () => {
	const {
		data, isLoading, isSuccess,
	} = useQuery<Project[], Error>( 'all_projects', ProjectController.get_all );
	return (
		<Flex flexDir="column" w="100%">
			<Fade in>
				<TopBar title="All Projects" />
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
										<ProjectCard id={project.id} title={project.title} users={project.users} />
									</WrapItem>
								) )}
							</Wrap>
						)
					}
				</Container>
			</Fade>
		</Flex>
	);
};

export default AllProjects;
