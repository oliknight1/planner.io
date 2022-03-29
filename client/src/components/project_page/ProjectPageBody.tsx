import {
	Grid, GridItem, Box, VStack, Heading, Avatar, AvatarGroup,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { Task, User } from '../../utils/types';

interface TaskColumnProps {
	column_header: string,
	tasks: Task[]
}

interface TaskProps {
	title : string,
	users: any[]
}
const TaskCard : FC<TaskProps> = ( { title, users } ) => (
	<VStack bg="#181818" w="95%" borderRadius="md" p={4} alignItems="start" spacing={4}>
		<Heading size="md" fontWeight="medium">{title}</Heading>
		<AvatarGroup>
			{
				users
					? ( users.map( ( user : User ) => <Avatar key={user.id} name={user.display_name} /> ) )
					: null
			}
		</AvatarGroup>
	</VStack>
);

const TaskColumn : FC<TaskColumnProps> = ( { column_header, tasks } ) => (
	<VStack>
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
		{ tasks.map( ( task : Task ) => (
			<TaskCard key={task.id} title={task.title} users={task.users} />
		) ) }
	</VStack>
);

interface ProjectPageBodyProps {
	tasks:Task[]
}
const ProjectPageBody : FC<ProjectPageBodyProps> = ( { tasks } ) => {
	const backlog_tasks : Task[] = tasks.filter( ( task : Task ) => task.column === 'backlog' );
	const in_progress_tasks: Task[] = tasks.filter( ( task : Task ) => task.column === 'in_progress' );
	const completed_tasks: Task[] = tasks.filter( ( task : Task ) => task.column === 'completed' );
	return (
		<Grid templateColumns="repeat( 3, 1fr )" gap={40} mt={6}>
			<GridItem>
				<TaskColumn column_header="Backlog" tasks={backlog_tasks} />
			</GridItem>
			<GridItem>
				<TaskColumn column_header="In Progress" tasks={in_progress_tasks} />
			</GridItem>
			<GridItem>
				<TaskColumn column_header="Completed" tasks={completed_tasks} />
			</GridItem>
		</Grid>

	);
};
export default ProjectPageBody;
