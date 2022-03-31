import React, { FC } from 'react';
import {
	VStack, Box, List, ListItem,
} from '@chakra-ui/react';
import {
	Draggable, DraggableProvided, Droppable, DroppableProvided,
} from 'react-beautiful-dnd';
import { Task } from '../../utils/types';
import TaskCard from './TaskCard';

interface TaskColumnProps {
	column_header: string,
	tasks: Task[],
	droppable_id: string
}

const TaskColumn : FC<TaskColumnProps> = ( { column_header, tasks, droppable_id } ) => (
	<VStack bg="#121212" borderRadius="xl">
		<Box
			bg="#181818"
			textAlign="center"
			borderRadius="xl"
			fontSize="2xl"
			boxShadow="md"
			w="100%"
		>
			{ column_header }
		</Box>
		<Box as={Droppable} droppableId={droppable_id} id="test" h="100%">
			{ ( droppable_provided : DroppableProvided ) => (
				<List
					overflowY="auto"
					minHeight="20vh"
					maxH="80vh"
					{...droppable_provided.droppableProps}
					width="90%"
					ref={droppable_provided.innerRef}
				>
					{ tasks.map( ( task: Task, index ) => (
						<Draggable draggableId={task.id} index={index} key={task.id}>
							{ ( draggable_provided : DraggableProvided ) => (
								<ListItem
									{...draggable_provided.draggableProps}
									{...draggable_provided.dragHandleProps}
									ref={draggable_provided.innerRef}
									py={4}
								>
									<TaskCard title={task.title} users={task.users} />
								</ListItem>
							) }
						</Draggable>
					) ) }
					{droppable_provided.placeholder}
				</List>
			) }
		</Box>

	</VStack>
);
export default TaskColumn;
