import {
	Modal, ModalOverlay, ModalContent, ModalHeader,
	ModalCloseButton, ModalBody, ModalFooter, Button,
	FormControl, Input, useColorMode, FormLabel, FormHelperText,
	VStack, HStack, AvatarGroup, Avatar,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { AddIcon } from '@chakra-ui/icons';
import { User } from '../../utils/types';

interface NewProjectDialogProps {
	is_open: boolean,
	on_close: () => void
}

const get_by_email = async ( email : string ) : Promise<User> => {
	const response = await axios.get( `/api/users/email/${email}` );
	return response.data;
};

const NewProjectDialog : FC<NewProjectDialogProps> = ( { is_open, on_close } ) => {
	const [ member_email, set_member_email ] = useState<string>( '' );
	const [ invited_members, set_invited_members ] = useState<User[]>( [] );
	const [ title, set_title ] = useState<string>( '' );
	const { colorMode } = useColorMode();
	const {
		data, error, isError, isLoading, isSuccess, refetch,
	} = useQuery<User, Error>( 'get_by_email', () => get_by_email( 'test@email.com' ), { enabled: false, refetchOnMount: false } );

	useEffect( () => {
		if ( isSuccess ) {
			set_invited_members( [ data ] );
		}
	}, [ data ] );
	return (
		<Modal onClose={on_close} isOpen={is_open} isCentered>
			<ModalOverlay />
			<ModalContent background={colorMode === 'dark' ? 'gray.800' : 'white'}>
				<ModalHeader>New Project</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<form onSubmit={( e ) => e.preventDefault()}>
						<VStack spacing={6}>
							<FormControl isRequired>
								<FormLabel>Project Title</FormLabel>
								<Input type="text" variant="filled" placeholder="Title" onChange={( e ) => set_title( e.currentTarget.value )} value={title} />
							</FormControl>
							<FormControl>
								<FormLabel>Invite members</FormLabel>
								<HStack>
									<Input
										type="email"
										placeholder="Member email"
										variant="filled"
										value={member_email}
										onChange={( e ) => set_member_email( e.currentTarget.value )}
									/>
									<Button
										variant="outline"
										_hover={{ backgroundColor: 'rgba(255,182,0,0.12)' }}
										onClick={() => refetch()}
										rightIcon={<AddIcon />}
										isLoading={isLoading}
									>
										Invite
									</Button>
								</HStack>
								<FormHelperText>Enter member&apos;s email address</FormHelperText>
							</FormControl>
						</VStack>
					</form>
					<FormLabel mt={6}>Members</FormLabel>
					<AvatarGroup>
						{
							invited_members.map( ( member ) => <Avatar name={member.display_name} /> )
						}
					</AvatarGroup>
				</ModalBody>
				<ModalFooter>
					<Button onClick={on_close}>Close</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default NewProjectDialog;
