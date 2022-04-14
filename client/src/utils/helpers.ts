import { useBreakpoint } from '@chakra-ui/react';
import { DraggableLocation } from 'react-beautiful-dnd';
import { TaskController } from '../controllers/TaskController';
import { ColumnName } from './enums';
import { Task } from './types';

export const is_mobile_breakpoint = () : boolean => {
	const current_breakpoint = useBreakpoint();
	return [ 'base', 'sm' ].includes( current_breakpoint as string );
};

export const reorder_tasks = (
	task_list : Task[],
	start_index : number,
	end_index : number,
) : Task[] => {
	const result = Array.from( task_list );
	const [ reordered_item ] = result.splice( start_index, 1 );
	result.splice( end_index, 0, reordered_item );
	return result;
};
export const move_to_list = (
	source : Task[],
	destination : Task[],
	droppable_source : DraggableLocation,
	droppable_destination : DraggableLocation,
	token: string,
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
		post_data.column = 'Backlog';
		break;
	case ColumnName.In_Progress:
		post_data.column = 'In Progress';
		break;
	case ColumnName.Completed:
		post_data.column = 'Completed';
		break;
	default:
		throw new Error( 'Invalid droppable id' );
	}
	TaskController.update_task( token, reordered_item.id as string, post_data );

	destination_clone.splice( droppable_destination.index, 0, reordered_item );

	const result = {
		[+droppable_source.droppableId]: source_clone,
		[+droppable_destination.droppableId]: destination_clone,
	};
	return result;
};
