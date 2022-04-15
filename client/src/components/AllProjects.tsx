import {
	Center, Container, Wrap, Spinner,
	WrapItem, Fade, Flex, Box, useColorMode,
	Heading, Text,
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
	const { colorMode } = useColorMode();
	return (
		<Flex flexDir="column" w="100%">
			<Fade in>
				<TopBar title="All Projects" is_project_page={false} />
				<Container maxW="100%" py={6}>
					{
						isLoading
						&& <Center w="100%" h="100%"><Spinner size="xl" color="yellow.300" /></Center>
					}
					{
						isSuccess
						&& data.length > 0 && (
							<Wrap spacing={5}>
								{data.map( ( project ) => (
									<WrapItem key={project.id}>
										<ProjectCard id={project.id} title={project.title} users={project.users} />
									</WrapItem>
								) )}
							</Wrap>
						)
					}
					{
						isSuccess && data.length <= 0
						&& (
							<Center>
								<Box
									textAlign="center"
									w="fit-content"
									p={8}
									borderRadius="xl"
									boxShadow="lg"
									background={colorMode === 'dark' ? '#181818' : '#FFFFFF'}
								>
									<Heading size="lg" fontWeight="light">
										You are not assigned to any projects
									</Heading>
									<Text fontSize="xl" mt={6}>
										Try creating one!
									</Text>

								</Box>
							</Center>
						)
					}
				</Container>
			</Fade>
		</Flex>
	);
};

export default AllProjects;
