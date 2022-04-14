import { ChevronDownIcon } from '@chakra-ui/icons';
import {
	ModalHeader, Modal, ModalCloseButton, ModalContent,
	ModalOverlay, useColorMode, ModalBody, Input, Textarea,
	FormControl, FormLabel, Menu, MenuButton, Button, MenuList,
	MenuItemOption, Avatar, AvatarGroup, MenuOptionGroup, ModalFooter,
	useToast,
	UseToastOptions,
} from '@chakra-ui/react';
import React, {
	FC, SyntheticEvent, useEffect, useState,
} from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useUser } from '../../contexts/auth_context';
import { ProjectController } from '../../controllers/ProjectController';
import { TaskController } from '../../controllers/TaskController';
import { useCachedProject } from '../../utils/hooks';
import { Project, Task, User } from '../../utils/types';
import DeletePopover from '../DeletePopover';

interface TaskDialogProps {
	is_open: boolean,
	on_close: () => void,
	users: User[],
	project_id: string,
	task_data: Task | null
}

const TaskDialog : FC<TaskDialogProps> = ( {
	is_open, on_close, users, project_id, task_data,
} ) => {
	const [ title, set_title ] = useState<string>( '' );
	const [ body_text, set_body_text ] = useState<string>( '' );
	const [ assinged_users, set_assigned_users ] = useState<User[]>( [] );
	const [ success_toast_msg, set_success_toast_msg ] = useState<String>( 'Task created' );
	const [ popover_open, set_popover_open ] = useState<boolean>( false );

	const { colorMode } = useColorMode();

	const authed_user = useUser().user;

	const toast = useToast();

	const error_toast : UseToastOptions = {
		title: 'An error occured',
		description: 'Please try again',
		status: 'error',
		isClosable: true,
		position: 'bottom-left',
	};
	const query_client = useQueryClient();

	const project : Project | undefined = useCachedProject();
	if ( !project ) {
		on_close();

		toast( error_toast );
	}

	useEffect( () => {
		if ( !task_data ) return;
		set_title( task_data.title );
		set_body_text( task_data.body_text );
		set_assigned_users( task_data.users as User[] );
		set_success_toast_msg( 'Task updated' );
	}, [ task_data ] );

	const handle_assigning_users = ( e : string[] | string ) => {
		if ( e instanceof Array ) {
			const users_to_assign : ( User | undefined )[] = e.map(
				( id : string ) => users.find( ( user : User ) => user.id === id ),
			);
			if ( users_to_assign ) {
				set_assigned_users( users_to_assign as User[] );
			}
		}
	};
	const project_mutation = useMutation(
		( task : Task ) => ProjectController.add_task( authed_user.token, project_id, task.id! ),
		{
			onMutate: async ( data ) => {
				//     // Cancel refetch so they do not overwrite new fetch
				await query_client.cancelQueries( [ 'single_project', { id: project_id } ] );

				const previous_project : Project | undefined = query_client.getQueryData( [ 'single_project', { id: project_id } ] );

				const new_columns = [
					{
						...previous_project?.columns[0],
						tasks: [ ...previous_project!.columns[0].tasks, data ],
					},
					{
						...previous_project?.columns[1],
					},
					{
						...previous_project?.columns[2],
					},

				];

				const new_project = {
					...previous_project,
					columns: new_columns,
				};

				return { previous_project, new_project };
			},

			onError: ( context : any ) => {
				if ( context.previous_project ) {
					query_client.setQueryData( [ 'single_project', { id: project_id } ], context.previous_project );
					toast( error_toast );
				}
			},
			//   // refetch after error or success
			onSettled: () => {
				query_client.invalidateQueries( [ 'single_project', { id: project_id } ] );
			},
		},
	);

	const handle_submit = useMutation( ( e : SyntheticEvent ) => {
		e.preventDefault();
		if ( task_data ) {
			const user_ids : string[] = assinged_users.map( ( user ) => user.id );
			return TaskController.update_task(
				authed_user.token,
				task_data.id!,
				{ title, body_text, users: user_ids },
			);
		}
		const assinged_users_ids : string[] = assinged_users.map(
			( assinged_user ) => assinged_user.id,
		);
		const new_task : Task = {
			title,
			body_text,
			users: assinged_users_ids,
			project: project_id,
			tags: [],
			column: 'Backlog',
		};
		return TaskController.create( authed_user.token, new_task );
	}, {
		onSuccess: async ( response ) => {
			toast( {
				title: success_toast_msg,
				status: 'success',
				isClosable: true,
				position: 'bottom-left',
			} );
			on_close();
			if ( response.data ) {
				project_mutation.mutate( response.data );
			}
			query_client.invalidateQueries( [ 'single_project', { id: project_id } ] );
		},
		onError: () => {
			toast( error_toast );
		},
	} );

	const delete_task = useMutation(
		( _e : SyntheticEvent ) => TaskController.remove( authed_user.token, task_data!.id! ),
		{
			onError: () => {
				toast( error_toast );
			},
			// refetch data
			onSettled: () => {
				query_client.invalidateQueries( [ 'single_project', { id: project_id } ] );
			},
			onSuccess: ( response ) => {
				set_title( '' );
				set_assigned_users( [] );
				set_body_text( '' );
				set_popover_open( false );
				on_close();
				toast( {
					title: 'Task deleted',
					status: 'success',
					isClosable: true,
					position: 'bottom-left',
				} );
			},
		},
	);

	return (
		<Modal onClose={on_close} isOpen={is_open} isCentered size="xl">
			<ModalOverlay />
			<ModalContent background={colorMode === 'dark' ? 'gray.800' : 'white'}>
				<form onSubmit={handle_submit.mutate}>
					<ModalCloseButton />
					<ModalHeader mt={4}>
						<Input
							placeholder="New Task"
							variant="flushed"
							value={title}
							size="lg"
							fontSize="xl"
							onChange={( e ) => set_title( e.target.value )}
						/>
					</ModalHeader>
					<ModalBody>
						<FormControl>
							<Menu closeOnSelect={false}>
								<MenuButton
									as={Button}
									variant="unstyled"
									size="lg"
									rightIcon={<ChevronDownIcon />}
									mb={4}
								>
									Members
								</MenuButton>
								<MenuList>
									<MenuOptionGroup type="checkbox" onChange={handle_assigning_users}>
										{users.map( ( user ) => (
											<MenuItemOption
												value={user.id}
												key={user.id}
												alignItems="center"
											>
												<Avatar size="sm" name={user.display_name} mr={2} />
												{user.display_name}
											</MenuItemOption>
										) )}
									</MenuOptionGroup>
								</MenuList>
							</Menu>
							<AvatarGroup mb={8}>
								{ assinged_users.map( ( user : User ) => <Avatar name={user.display_name} size="md" key={user.id} /> ) }
							</AvatarGroup>
						</FormControl>
						<FormControl mb={8}>
							<FormLabel htmlFor="body_text">Description</FormLabel>
							<Textarea value={body_text} placeholder="Task description" id="body_text" resize="none" onChange={( e ) => set_body_text( e.target.value )} />
						</FormControl>
					</ModalBody>
					<ModalFooter justifyContent={task_data ? 'space-between' : undefined}>
						{
							task_data
							&& (
								<DeletePopover
									title="Are you sure you want to delete this task?"
									handle_delete={delete_task}
									popover_open={popover_open}
									set_popover_open={set_popover_open}
								/>
							)
						}
						<Button type="submit" variant="outline">Save</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
};
export default TaskDialog;
