import {
	Avatar, AvatarGroup, Box, Heading, Link, LinkBox, useColorMode,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { User } from '../utils/types';

interface ProjectCardProps {
	id: string
	title: string,
	users: User[]
}
const ProjectCard : FC<ProjectCardProps> = ( { id, title, users } ) => {
	const Card = motion( Box );
	const { colorMode } = useColorMode();
	return (
		<LinkBox>
			<Link as={RouterLink} to={`project/${id}`}>
				<Card
					whileHover={{ borderColor: '#FFB600', scale: 1.05 }}
					borderColor={colorMode === 'dark' ? '#1F1F1F' : '#FFFFFF'}
					borderWidth="2px"
					borderRadius="lg"
					boxShadow="lg"
					w="sm"
					p={4}
					bg={colorMode === 'dark' ? '#181818' : '#FFFFFF'}
				>
					<Heading size="md" isTruncated>{title}</Heading>
					<AvatarGroup mt={6}>
						{
							users.map( ( user ) => <Avatar borderColor="transparent" key={user.id} name={user.display_name} /> )
						}
					</AvatarGroup>
				</Card>
			</Link>
		</LinkBox>
	);
};
export default ProjectCard;
