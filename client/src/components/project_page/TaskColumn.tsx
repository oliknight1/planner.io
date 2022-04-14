import React, { FC, useState } from 'react';
import {
	VStack, Box, List, ListItem, useDisclosure, useColorMode,
} from '@chakra-ui/react';
import {
	Draggable, DraggableProvided, DraggableStateSnapshot, Droppable, DroppableProvided,
} from 'react-beautiful-dnd';
import { Task, User } from '../../utils/types';
import TaskCard from './TaskCard';
import TaskDialog from './TaskDialog';

interface TaskColumnProps {
	column_header: string,
	tasks: Task[],
	droppable_id: string,
	project_users : User[],
	project_id: string
}

const TaskColumn : FC<TaskColumnProps> = ( {
	column_header, tasks, droppable_id,
} ) => {
	const [ open_task, set_open_task ] = useState<Task|null>( null );
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { colorMode } = useColorMode();

	const handle_task_click = ( index : number ) => {
		set_open_task( tasks[index] );
		onOpen();
	};
	return (
		<>
			<VStack
				background={colorMode === 'dark' ? '#121212' : 'gray.200'}
				borderRadius="xl"
				w="xs"
			>
				<Box
					background={colorMode === 'dark' ? '#181818' : 'brand.dark_blue'}
					color="white"
					textAlign="center"
					borderRadius="xl"
					fontSize="2xl"
					boxShadow="md"
					w="100%"
				>
					{ column_header }
				</Box>
				<Box as={Droppable} droppableId={droppable_id} h="100%">
					{ ( droppable_provided : DroppableProvided ) => (
						<List
							overflowY="auto"
							{...droppable_provided.droppableProps}
							width="90%"
							maxH="80vh"
							minH="5vh"
							ref={droppable_provided.innerRef}
						>
							{ tasks.map( ( task: Task, index : number ) => (
								<Draggable draggableId={task.id!} index={index} key={task.id}>
									{ (
										draggable_provided : DraggableProvided,
										draggable_snapshot: DraggableStateSnapshot,
									) => (
										<ListItem
											{...draggable_provided.draggableProps}
											{...draggable_provided.dragHandleProps}
											ref={draggable_provided.innerRef}
											py={4}
										>
											<TaskCard
												title={task.title}
												users={task.users as User[]}
												snapshot={draggable_snapshot}
												index={index}
												handle_click={handle_task_click}
											/>
										</ListItem>
									) }
								</Draggable>
							) ) }
							{droppable_provided.placeholder}
						</List>
					) }
				</Box>

			</VStack>
			<TaskDialog
				is_open={isOpen}
				on_close={onClose}
				task_data={open_task}
			/>
		</>
	);
};
export default TaskColumn;
