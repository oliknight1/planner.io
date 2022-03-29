import {
	Grid, GridItem,
} from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import {
	DragDropContext, DropResult,
} from 'react-beautiful-dnd';
import { Task } from '../../utils/types';
import TaskColumn from './TaskColumn';

interface ProjectPageBodyProps {
	tasks:Task[]
}
const ProjectPageBody : FC<ProjectPageBodyProps> = ( { tasks } ) => {
	const filter_tasks = ( column : string ) => (
		tasks.filter( ( task: Task ) => task.column === column )
	);
	const [ backlog_tasks, set_backlog_tasks ] = useState<Task[]>( filter_tasks( 'backlog' ) );
	const [ in_progress_tasks, set_in_progress_tasks ] = useState<Task[]>( filter_tasks( 'in_progress' ) );
	const [ completed_tasks, set_completed_tasks ] = useState<Task[]>( filter_tasks( 'completed' ) );

	const handle_drag_end = ( result : DropResult ) => null;
	return (
		<Grid templateColumns="repeat( 3, 1fr )" gap={40} mt={6}>
			<DragDropContext onDragEnd={handle_drag_end}>
				<GridItem>
					<TaskColumn column_header="Backlog" tasks={backlog_tasks} droppable_id="backlog" />
				</GridItem>
				<GridItem>
					<TaskColumn column_header="In Progress" tasks={in_progress_tasks} droppable_id="in_progress" />
				</GridItem>
				<GridItem>
					<TaskColumn column_header="Completed" tasks={completed_tasks} droppable_id="completed" />
				</GridItem>
			</DragDropContext>
		</Grid>

	);
};
export default ProjectPageBody;
