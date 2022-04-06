import {
	Avatar, AvatarGroup, Box, Heading, Link, LinkBox, useColorMode,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { User } from '../utils/types';
import Card from './Card';

interface ProjectCardProps {
	id: string
	title: string,
	users: User[]
}
const ProjectCard : FC<ProjectCardProps> = ( { id, title, users } ) => (
	<LinkBox>
		<Link as={RouterLink} to={`${id}`}>
			<Card>
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
export default ProjectCard;
