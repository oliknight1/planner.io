import { ChevronDownIcon, DeleteIcon } from '@chakra-ui/icons';
import {
	ModalHeader, Modal, ModalCloseButton, ModalContent,
	ModalOverlay, useColorMode, ModalBody, Input, Textarea,
	FormControl, FormLabel, Menu, MenuButton, Button, MenuList,
	MenuItemOption, Avatar, AvatarGroup, MenuOptionGroup, ModalFooter,
	useToast, IconButton, PopoverTrigger, Popover, PopoverContent, PopoverHeader,
	PopoverArrow, PopoverCloseButton, PopoverBody, PopoverFooter, ButtonGroup,
} from '@chakra-ui/react';
import React, {
	FC, SyntheticEvent, useEffect, useState,
} from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useUser } from '../../contexts/auth_context';
import { ProjectController } from '../../controllers/ProjectController';
import { TaskController } from '../../controllers/TaskController';
import { Project, Task, User } from '../../utils/types';

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
	const open_popover = () => set_popover_open( !popover_open );
	const close_popover = () => set_popover_open( false );

	const { colorMode } = useColorMode();

	const authed_user = useUser().user;

	const toast = useToast();

	const query_client = useQueryClient();

	useEffect( () => {
		if ( !task_data ) return;
		set_title( task_data.title );
		set_body_text( task_data.body_text );
		set_assigned_users( task_data.users as User[] );
		set_success_toast_msg( 'Task updated' );
	}, [ task_data ] );

	const handle_assigning_users = ( e : string[] | string ) => {
		if ( e instanceof Array ) {
			const users_to_assign = e.map(
				( id : string ) => users.find( ( user : User ) => user.id === id ),
			);
			set_assigned_users( users_to_assign as User[] );
		}
	};

	// if there is no data passed to component, create new task
	// else update task
	const project_mutation = useMutation(
		( task : Task ) => (
			!task_data ? ProjectController.add_task(
				authed_user.token,
				project_id,
				task.id!,
			)
				: TaskController.update_task(
					authed_user.token,
					task_data.id!,
					{ title, body_text, assinged_users },
				) ),
		{
			onMutate: async ( data ) => {
				// Cancel refetch so they do not overwrite new fetch
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

				query_client.setQueryData( [ 'single_project', { id: project_id } ], new_project );
				return { previous_project, new_project };
			},

			onError: ( context : any ) => {
				if ( context.previous_project ) {
					query_client.setQueryData( [ 'single_project', { id: project_id } ], context.previous_project );
				}
			},
			// refetch after error or success
			onSettled: () => {
				query_client.invalidateQueries( [ 'single_project', { id: project_id } ] );
			},
		},
	);

	const create_task = useMutation( ( e : SyntheticEvent ) => {
		e.preventDefault();
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
			project_mutation.mutate( response.data );
		},
	} );
	if ( create_task.error && create_task.error instanceof Error ) {
		toast( {
			title: 'There was an error creating project',
			description: create_task.error.message,
			status: 'error',
			isClosable: true,
			position: 'top',
		} );
	}
	if ( project_mutation.error && project_mutation.error instanceof Error ) {
		toast( {
			title: 'There was an error creating project',
			description: project_mutation.error.message,
			status: 'error',
			isClosable: true,
			position: 'top',
		} );
	}

	const delete_task = useMutation( ( _e : SyntheticEvent ) => {
		close_popover();
		on_close();
		return TaskController.remove( authed_user.token, task_data!.id! );
	}, {
		onError: () => {
			toast( {
				title: 'There was an error deleting the task',
				description: project_mutation.error.message,
				status: 'error',
				isClosable: true,
				position: 'top',
			} );
		},
		// refetch data
		onSettled: () => {
			query_client.invalidateQueries( [ 'single_project', { id: project_id } ] );
		},
		onSuccess: () => {
			toast( {
				title: 'Task deleted',
				status: 'success',
				isClosable: true,
				position: 'bottom-left',
			} );
		},
	} );

	return (
		<Modal onClose={on_close} isOpen={is_open} isCentered>
			<ModalOverlay />
			<ModalContent background={colorMode === 'dark' ? 'gray.800' : 'white'}>
				<form onSubmit={create_task.mutate}>
					<ModalCloseButton />
					<ModalHeader mt={4}>
						<Input placeholder="New Task" variant="flushed" value={title} size="lg" onChange={( e ) => set_title( e.target.value )} />
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
						<FormControl>
							<FormLabel htmlFor="body_text">Description</FormLabel>
							<Textarea value={body_text} placeholder="Task description" id="body_text" resize="none" onChange={( e ) => set_body_text( e.target.value )} />
						</FormControl>
					</ModalBody>
					<ModalFooter justifyContent={task_data ? 'space-between' : undefined}>
						{
							task_data
						&& (
							<Popover
								returnFocusOnClose={false}
								isOpen={popover_open}
								onClose={close_popover}
								placement="right"
								closeOnBlur={false}

							>
								<PopoverTrigger><IconButton onClick={open_popover} variant="ghost" icon={<DeleteIcon w={6} h={6} />} aria-label="Delete task" /></PopoverTrigger>
								<PopoverContent>
									<PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
									<PopoverArrow />
									<PopoverCloseButton />
									<PopoverBody>
										Are you sure you want to delete this task?
									</PopoverBody>
									<PopoverFooter d="flex" justifyContent="flex-end">
										<ButtonGroup size="sm" onClick={close_popover}>
											<Button variant="outline" onClick={close_popover}>Cancel</Button>
											<Button variant="solid" colorScheme="red" onClick={delete_task.mutate}>Apply</Button>
										</ButtonGroup>
									</PopoverFooter>
								</PopoverContent>
							</Popover>
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
