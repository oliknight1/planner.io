import {
	Container,
	Grid, GridItem,
} from '@chakra-ui/react';
import React, {
	FC, useEffect, useState,
} from 'react';
import {
	DragDropContext, DraggableLocation, DropResult,
} from 'react-beautiful-dnd';
import { useUser } from '../../contexts/auth_context';
import { ProjectController } from '../../controllers/ProjectController';
import { TaskController } from '../../controllers/TaskController';
import { ColumnName } from '../../utils/enums';
import { is_mobile_breakpoint } from '../../utils/helpers';
import { Task, TaskColumnI } from '../../utils/types';
import TaskColumn from './TaskColumn';

interface ProjectPageBodyProps {
	project_id : string,
	columns: TaskColumnI[]
}

const ProjectPageBody : FC<ProjectPageBodyProps> = ( { project_id, columns } ) => {
	const [ task_columns, set_task_columns ] = useState<TaskColumnI[]>( columns );
	const { user } = useUser();

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
			column: {
				name: '',
			},
		};

		switch ( droppable_id ) {
		case ColumnName.Backlog:
			post_data.column.name = 'backlog';
			break;
		case ColumnName.In_Progress:
			post_data.column.name = 'in_progress';
			break;
		case ColumnName.Completed:
			post_data.column.name = 'completed';
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

		const columns_clone = [ ...columns ];

		// If task stayed in the same column
		if ( source_id === destination_id ) {
			const items = reorder_tasks(
				columns[source_id].tasks,
				source.index,
				destination.index,
			);
			columns_clone[source_id].tasks = items;
		} else {
		// If task moved to a different column
			const move_result = move_to_list(
				columns[source_id].tasks,
				columns[destination_id].tasks,
				source,
				destination,
			);
			columns_clone[source_id].tasks = move_result[source_id];
			columns_clone[destination_id].tasks = move_result[destination_id];
		}
		const request = columns_clone.map( ( column ) => ( {
			title: column.title,
			tasks: column.tasks.map( ( task ) => task.id ),
		} ) );
		set_task_columns( columns_clone );
		ProjectController.update( user.token, request, project_id );
	};
	return (
		<Grid templateColumns="repeat( 3, 1fr )" gap={40} mt={6} pl={12} h={is_mobile_breakpoint() ? '100vh' : undefined} maxW="100%" overflowX="auto">
			<DragDropContext onDragEnd={handle_drag_end}>
				{
					task_columns.map( ( column : TaskColumnI, index : number ) => (
						<GridItem key={column.id}>
							<TaskColumn
								column_header={column.title}
								tasks={column.tasks}
								droppable_id={`${index}`}
							/>
						</GridItem>
					) )
				}
			</DragDropContext>
		</Grid>

	);
};
export default ProjectPageBody;
