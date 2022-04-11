import {
	Heading, AvatarGroup, Avatar, Center, useColorMode,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { DraggableStateSnapshot } from 'react-beautiful-dnd';
import { User } from '../../utils/types';
import Card from '../Card';

interface TaskCardProps {
	title : string,
	users: User[],
	snapshot: DraggableStateSnapshot,
	index: number,
	handle_click : ( index : number ) => void
}
const TaskCard : FC<TaskCardProps> = ( {
	title, users, snapshot, index, handle_click,
} ) => {
	const { colorMode } = useColorMode();
	let border_color;
	if ( snapshot.isDragging ) {
		border_color = '#FFB600';
	} else {
		(
			border_color = colorMode === 'dark' ? '#181818' : '#FFFFFF'
		);
	}
	return (
		<Center zIndex={-1}>
			<Card
				w="85%"
				borderColor={border_color}
				transform={snapshot.isDragging ? 'scale(1.05)' : undefined}
				onClick={() => handle_click( index )}
			>
				<Heading size="md" fontWeight="medium" mb={6}>{title}</Heading>
				<AvatarGroup>
					{
						users
							? ( users.map( ( user : User ) => <Avatar borderColor="transparent" key={user.id} name={user.display_name} /> ) )
							: null
					}
				</AvatarGroup>

			</Card>
		</Center>
	);
};
export default TaskCard;
