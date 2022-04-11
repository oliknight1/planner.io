import { DeleteIcon } from '@chakra-ui/icons';
import {
	IconButton, Popover, PopoverArrow, PopoverContent,
	PopoverHeader, PopoverTrigger, PopoverBody, PopoverCloseButton,
	PopoverFooter, ButtonGroup, Button,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { UseMutationResult } from 'react-query';

interface DeletePopoverProps {
	handle_delete: UseMutationResult<any, unknown, React.SyntheticEvent<Element, Event>, unknown>
	title: string,
	popover_open: boolean,
	set_popover_open: React.Dispatch<React.SetStateAction<boolean>>,

}

const DeletePopover : FC<DeletePopoverProps> = ( {
	handle_delete,
	title,
	popover_open,
	set_popover_open,
} ) => (

	<Popover
		returnFocusOnClose={false}
		isOpen={popover_open}
		onClose={() => set_popover_open( false )}
		placement="right"
		closeOnBlur={false}
	>
		<PopoverTrigger>
			<IconButton onClick={() => set_popover_open( true )} variant="ghost" icon={<DeleteIcon w={6} h={6} />} aria-label="Delete task" />
		</PopoverTrigger>
		<PopoverContent>
			<PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
			<PopoverArrow />
			<PopoverCloseButton />
			<PopoverBody>
				{title}
			</PopoverBody>
			<PopoverFooter d="flex" justifyContent="flex-end">
				<ButtonGroup size="sm">
					<Button variant="outline" onClick={() => set_popover_open( false )}>Cancel</Button>
					<Button variant="solid" colorScheme="red" onClick={handle_delete.mutate}>Apply</Button>
				</ButtonGroup>
			</PopoverFooter>
		</PopoverContent>
	</Popover>
);
export default DeletePopover;
