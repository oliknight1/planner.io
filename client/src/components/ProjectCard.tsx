import {
	Avatar, AvatarGroup, Box, Heading, Link, LinkBox,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { User } from '../utils/types';

interface ProjectCardProps {
	title: string,
	users: User[]
}
const ProjectCard : FC<ProjectCardProps> = ( { title, users } ) => (
	<LinkBox>
		<Link href={`project/${title}`}>
			<Box borderWidth="1px" borderRadius="lg" w="sm" p={4}>
				<Heading size="md" isTruncated>{title}</Heading>
				<AvatarGroup mt={6}>
					{
						users.map( ( user ) => <Avatar key={user.id} name={user.display_name} /> )
					}
				</AvatarGroup>
			</Box>
		</Link>
	</LinkBox>
);

export default ProjectCard;
