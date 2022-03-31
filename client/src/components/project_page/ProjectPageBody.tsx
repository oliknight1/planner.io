import {
	Grid, GridItem,
} from '@chakra-ui/react';
import React, {
	FC, useEffect, useState,
} from 'react';
import {
	DragDropContext, DraggableLocation, DropResult,
} from 'react-beautiful-dnd';
import { useUser } from '../../contexts/auth_context';
import { TaskController } from '../../controllers/TaskController';
import { ColumnName } from '../../utils/enums';
import { Task, TaskColumnI } from '../../utils/types';
import TaskColumn from './TaskColumn';

interface ProjectPageBodyProps {
	tasks:Task[]
}

const ProjectPageBody : FC<ProjectPageBodyProps> = ( { tasks } ) => {
	const filter_tasks = ( column : string ) : Task[] => (
		tasks.filter( ( task: Task ) => task.column === column )
	);
	const [ grouped_tasks, set_grouped_tasks ] = useState<TaskColumnI[]>( [] );

	const { user } = useUser();

	useEffect( () => {
		set_grouped_tasks(
			[
				{
					id: 0,
					title: 'Backlog',
					tasks: filter_tasks( 'backlog' ),
				},
				{
					id: 1,
					title: 'In Progress',
					tasks: filter_tasks( 'in_progress' ),
				},
				{
					id: 2,
					title: 'Completed',
					tasks: filter_tasks( 'completed' ),
				},
			],
		);
	}, [] );

	const reorder_tasks = (
		task_list : Task[],
		start_index : number,
		end_index : number,
	) : Task[] => {
		const result = Array.from( task_list );
		const [ reordered_item ] = result.splice( start_index, 1 );
		result.splice( end_index, 0, reordered_item );
		return result;
	};

	const move_to_list = (
		source : Task[],
		destination : Task[],
		droppable_source : DraggableLocation,
		droppable_destination : DraggableLocation,
	) => {
		const source_clone = Array.from( source );
		const destination_clone = Array.from( destination );
		const [ reordered_item ] = source_clone.splice( droppable_source.index, 1 );

		const droppable_id : number = +droppable_destination.droppableId;

		const post_data = {
			column: '',
		};

		switch ( droppable_id ) {
		case ColumnName.Backlog:
			post_data.column = 'backlog';
			break;
		case ColumnName.In_Progress:
			post_data.column = 'in_progress';
			break;
		case ColumnName.Completed:
			post_data.column = 'completed';
			break;
		default:
			throw new Error( 'Invalid droppable id' );
		}
		TaskController.update_task( user.token, reordered_item.id, post_data );

		destination_clone.splice( droppable_destination.index, 0, reordered_item );

		const result = {
			[+droppable_source.droppableId]: source_clone,
			[+droppable_destination.droppableId]: destination_clone,
		};
		return result;
	};

	const handle_drag_end = ( result : DropResult ) => {
		const { source, destination } = result;

		// Task was dropped outside of list
		if ( !destination ) {
			return;
		}
		const source_id = +source.droppableId;
		const destination_id = +destination.droppableId;

		// If task stayed in the same column
		if ( source_id === destination_id ) {
			const items = reorder_tasks(
				grouped_tasks[source_id].tasks,
				source.index,
				destination.index,
			);
			const new_state = [ ...grouped_tasks ];
			new_state[source_id].tasks = items;
			set_grouped_tasks( new_state );
		} else {
		// If task moved to a different column
			const move_result = move_to_list(
				grouped_tasks[source_id].tasks,
				grouped_tasks[destination_id].tasks,
				source,
				destination,
			);
			const state_clone = [ ...grouped_tasks ];
			state_clone[source_id].tasks = move_result[source_id];
			state_clone[destination_id].tasks = move_result[destination_id];
			set_grouped_tasks( state_clone );
		}
	};
	return (
		<Grid templateColumns="repeat( 3, 1fr )" gap={40} mt={6}>
			<DragDropContext onDragEnd={handle_drag_end}>
				{
					grouped_tasks.map( ( column : TaskColumnI ) => (
						<GridItem key={column.id}>
							<TaskColumn
								column_header={column.title}
								tasks={column.tasks}
								droppable_id={`${column.id}`}
							/>
						</GridItem>
					) )
				}
			</DragDropContext>
		</Grid>

	);
};
export default ProjectPageBody;
