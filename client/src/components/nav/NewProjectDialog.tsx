import {
	Modal, ModalOverlay, ModalContent, ModalHeader,
	ModalCloseButton, ModalBody, ModalFooter, Button,
	FormControl, Input, useColorMode, FormLabel, FormHelperText,
	VStack, HStack, AvatarGroup, Avatar, FormErrorMessage, useToast,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import React, {
	FC, SyntheticEvent, useEffect, useState,
} from 'react';
import axios from 'axios';
import { AddIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { User } from '../../utils/types';
import { useUser } from '../../contexts/auth_context';
import { ProjectController } from '../../controllers/ProjectController';
import { is_mobile_breakpoint } from '../../utils/helpers';

interface NewProjectDialogProps {
	is_open: boolean,
	on_close: () => void
}

const NewProjectDialog : FC<NewProjectDialogProps> = ( { is_open, on_close } ) => {
	const { user } = useUser();
	const { colorMode } = useColorMode();
	const toast = useToast();
	const navigate = useNavigate();
	const [ member_email, set_member_email ] = useState<string>( '' );
	const [ invited_members, set_invited_members ] = useState<User[]>( [ {
		token: user.token,
		id: user.id,
		display_name: user.display_name,
		email: user.email,
	} ] );
	const [ title, set_title ] = useState<string>( '' );
	const query_client = useQueryClient();

	const get_by_email = async ( email : string ) : Promise<User> => {
		set_member_email( '' );
		if ( email === user.email || invited_members.some( ( member ) => member.email === email ) ) {
			throw new Error( 'User already invited' );
		}
		try {
			const response = await axios.get( `/api/users/email/${email}` );
			return response.data;
		} catch ( error : any ) {
			if ( axios.isAxiosError( error ) ) {
				throw new Error( error.response?.data.error );
			}
			throw new Error( error.message );
		}
	};

	const {
		data, error, isError, isLoading, isSuccess, refetch,
	} = useQuery<User, Error>(
		'user_by_email',
		() => get_by_email( member_email ),
		{
			enabled: false,
			refetchOnMount: false,
			retry: ( failureCount, request_error ) => {
				// stop query from retrying if the user has already been invited
				if ( request_error.message === 'User already invited' ) {
					return false;
				}
				if ( failureCount <= 1 ) {
					return true;
				}
				return false;
			},

		},
	);

	useEffect( () => {
		if ( isSuccess ) {
			set_invited_members( [ ...invited_members, data ] );
		}
	}, [ data ] );

	const mutation = useMutation( ( e : SyntheticEvent ) => {
		e.preventDefault();
		return ProjectController.create( user.token, title, invited_members );
	}, {
		onError: ( mutation_error ) => {
			if ( mutation_error instanceof Error ) {
				toast( {
					title: 'There was an error creating project',
					description: mutation_error.message,
					status: 'error',
					isClosable: true,
					position: 'top',
				} );
			}
		},
		onSuccess: ( response ) => {
			navigate( `/projects/${response.data.id}` );
			query_client.invalidateQueries( 'all_projects' );
			on_close();
		},
	} );

	return (
		<Modal onClose={on_close} isOpen={is_open} isCentered size={is_mobile_breakpoint() ? 'sm' : 'xl'}>
			<ModalOverlay />
			<ModalContent background={colorMode === 'dark' ? 'gray.800' : 'white'}>
				<ModalHeader>New Project</ModalHeader>
				<ModalCloseButton />
				<form onSubmit={mutation.mutate}>
					<ModalBody>
						<VStack spacing={6}>
							<FormControl isRequired>
								<FormLabel>Project Title</FormLabel>
								<Input type="text" variant="filled" placeholder="Title" onChange={( e ) => set_title( e.currentTarget.value )} value={title} />
							</FormControl>
							<FormControl isInvalid={isError}>
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
								{ !isError
									&& <FormHelperText>Enter member&apos;s email address</FormHelperText>}
								<FormErrorMessage>{error?.message}</FormErrorMessage>
							</FormControl>
						</VStack>
						<FormLabel mt={6}>Members</FormLabel>
						<AvatarGroup>
							{
								invited_members.map(
									( member ) => <Avatar name={member.display_name} key={member.id} />,
								)
							}
						</AvatarGroup>
					</ModalBody>
					<ModalFooter>
						<Button type="submit" variant="outline">Submit</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
};

export default NewProjectDialog;
