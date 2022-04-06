import {
	Heading, AvatarGroup, Avatar, Center,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { DraggableStateSnapshot } from 'react-beautiful-dnd';
import { User } from '../../utils/types';
import Card from '../Card';

interface TaskCardProps {
	title : string,
	users: User[],
	snapshot: DraggableStateSnapshot
}
const TaskCard : FC<TaskCardProps> = ( { title, users, snapshot } ) => (
	<Center zIndex={-1}>
		<Card
			w="85%"
			borderColor={snapshot.isDragging ? '#FFB600' : '#181818'}
			transform={snapshot.isDragging ? 'scale(1.05)' : undefined}
		>
			<Heading size="md" fontWeight="medium">{title}</Heading>
			<AvatarGroup>
				{
					users
						? ( users.map( ( user : User ) => <Avatar key={user.id} name={user.display_name} /> ) )
						: null
				}
			</AvatarGroup>

		</Card>
	</Center>
);
export default TaskCard;
