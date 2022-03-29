import {
	List, VStack, Heading, AvatarGroup, Avatar,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { User } from '../../utils/types';

interface TaskCardProps {
	title : string,
	users: User[],
}
const TaskCard : FC<TaskCardProps> = ( { title, users } ) => (
	<List>
		<VStack bg="#181818" borderRadius="md" p={4} alignItems="start" spacing={4}>
			<Heading size="md" fontWeight="medium">{title}</Heading>
			<AvatarGroup>
				{
					users
						? ( users.map( ( user : User ) => <Avatar key={user.id} name={user.display_name} /> ) )
						: null
				}
			</AvatarGroup>
		</VStack>
	</List>
);
export default TaskCard;
