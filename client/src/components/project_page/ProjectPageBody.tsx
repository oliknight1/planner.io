import { AddIcon } from '@chakra-ui/icons';
import {
	Button,
	Fade,
	Grid, GridItem, useDisclosure,
} from '@chakra-ui/react';
import React, {
	FC,
} from 'react';
import {
	DragDropContext, DropResult,
} from 'react-beautiful-dnd';
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../contexts/auth_context';
import { ProjectController } from '../../controllers/ProjectController';
import { is_mobile_breakpoint, move_to_list, reorder_tasks } from '../../utils/helpers';
import { useCachedProject } from '../../utils/hooks';
import {
	Project, TaskColumnI,
} from '../../utils/types';
import TaskColumn from './TaskColumn';
import TaskDialog from './TaskDialog';

const ProjectPageBody : FC = () => {
	const { user } = useUser();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const navigate = useNavigate();
	const query_client = useQueryClient();
	const params = useParams();

	const project : Project | undefined = useCachedProject();
	if ( !project ) {
		navigate( '/*' );
		return null;
	}

	const handle_drag_end = ( result : DropResult ) => {
		query_client.cancelQueries( [ 'single_project', { id: params.id } ] );
		const { source, destination } = result;

		// Task was dropped outside of list
		if ( !destination ) {
			return;
		}
		const source_id = +source.droppableId;
		const destination_id = +destination.droppableId;

		const columns_clone = [ ...project.columns ];

		// If task stayed in the same column
		if ( source_id === destination_id ) {
			const items = reorder_tasks(
				project.columns[source_id].tasks,
				source.index,
				destination.index,
			);
			columns_clone[source_id].tasks = items;
		} else {
			const column_ids : string[] = project.columns.map( ( col ) => col.id );
			// If task moved to a different column
			const move_result = move_to_list(
				project.columns[source_id].tasks,
				project.columns[destination_id].tasks,
				source,
				destination,
				user.token,
				column_ids,
			);
			columns_clone[source_id].tasks = move_result[source_id];
			columns_clone[destination_id].tasks = move_result[destination_id];
		}
		const request = columns_clone.map( ( column ) => ( {
			title: column.title,
			tasks: column.tasks.map( ( task ) => task.id ),
		} ) );
		ProjectController.update( user.token, request, project.id );
		query_client.setQueryData( [ 'single_project', { id: project.id } ], { ...project, columns: columns_clone } );
	};
	return (
		<Fade in>
			<Grid templateColumns="repeat( 3, 1fr )" gap={30} mt={6} pl={12} h={is_mobile_breakpoint() ? '100vh' : undefined} maxW="100%" overflowX="auto">
				<DragDropContext onDragEnd={handle_drag_end}>
					{
						project.columns.map( ( column : TaskColumnI, index : number ) => (
							<GridItem key={column.id}>
								<TaskColumn
									column_header={column.title}
									tasks={column.tasks}
									droppable_id={`${index}`}
									project_id={project.id}
									project_users={project.users}
								/>
							</GridItem>
						) )
					}
					<Button
						pos="absolute"
						right={12}
						bottom={8}
						rightIcon={<AddIcon />}
						onClick={onOpen}
						_hover={{ transform: 'scale(1.2)' }}
					>
						New Task
					</Button>
					<TaskDialog
						is_open={isOpen}
						on_close={onClose}
						task_data={null}
					/>
				</DragDropContext>
			</Grid>
		</Fade>
	);
};
export default ProjectPageBody;
