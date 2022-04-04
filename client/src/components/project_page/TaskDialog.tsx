import { ChevronDownIcon } from '@chakra-ui/icons';
import {
	ModalHeader, Modal, ModalCloseButton, ModalContent,
	ModalOverlay, useColorMode, ModalBody, Input, Textarea,
	FormControl, FormLabel, Menu, MenuButton, Button, MenuList,
	MenuItemOption, Avatar, AvatarGroup, MenuOptionGroup,
} from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { User } from '../../utils/types';

interface TaskDialogProps {
	is_open: boolean,
	on_close: () => void,
	users: User[]
}

const TaskDialog : FC<TaskDialogProps> = ( { is_open, on_close, users } ) => {
	const [ tilte, set_title ] = useState<string>( '' );
	const [ body_text, set_body_text ] = useState<string>( '' );
	const [ assinged_users, set_assigned_users ] = useState<User[]>( [] );

	const { colorMode } = useColorMode();

	const handle_assigning_users = ( e : string[] | string ) => {
		if ( e instanceof Array ) {
			const users_to_assign = e.map(
				( id : string ) => users.find( ( user : User ) => user.id === id ),
			);
			set_assigned_users( users_to_assign as User[] );
		}
	};

	return (
		<Modal onClose={on_close} isOpen={is_open} isCentered>
			<ModalOverlay />
			<ModalContent background={colorMode === 'dark' ? 'gray.800' : 'white'}>
				<form>
					<ModalCloseButton />
					<ModalHeader>
						<Input placeholder="New Task" variant="unstyled" value={tilte} size="lg" onChange={( e ) => set_title( e.target.value )} />
					</ModalHeader>
					<ModalBody>
						<FormControl>
							<Menu>
								<MenuButton as={Button} variant="ghost" rightIcon={<ChevronDownIcon />}>
									Members
								</MenuButton>
								<MenuList>
									<MenuOptionGroup type="checkbox" onChange={handle_assigning_users}>
										{users.map( ( user ) => (
											<MenuItemOption
												value={user.id}
												key={user.id}
											>

												<Avatar size="sm" name={user.display_name} />
												{user.display_name}
											</MenuItemOption>
										) )}
									</MenuOptionGroup>
								</MenuList>
							</Menu>
							<AvatarGroup>
								{ assinged_users.map( ( user : User ) => <Avatar name={user.display_name} size="md" key={user.id} /> ) }
							</AvatarGroup>
						</FormControl>
						<FormControl>
							<FormLabel htmlFor="body_text">Description</FormLabel>
							<Textarea value={body_text} id="body_text" resize="none" onChange={( e ) => set_body_text( e.target.value )} />
						</FormControl>
					</ModalBody>
				</form>
			</ModalContent>
		</Modal>
	);
};
export default TaskDialog;
