import {
	ButtonGroup, Button, Divider,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { ViewType } from '../utils/enums';
import { GridViewIcon, ListViewIcon } from '../utils/icons';

interface ViewSwitcherProps {
	view: ViewType,
	set_view: React.Dispatch<React.SetStateAction<ViewType>>
}

const ViewSwitcher : FC<ViewSwitcherProps> = ( { view, set_view } ) => {
	const handle_click = ( view_type : ViewType ) => {
		set_view( view_type );
	};
	const hover_styling = {
		color: 'yellow.300',
	};
	return (
		<ButtonGroup variant="unstyled">
			<Button color={view === ViewType.Grid ? 'yellow.300' : 'text'} _hover={hover_styling} fontSize="lg" onClick={() => handle_click( ViewType.Grid )} id="grid-button" leftIcon={<GridViewIcon w={4} h={4} />}>Grid</Button>
			<Divider orientation="vertical" borderColor="white" />
			<Button color={view === ViewType.List ? 'yellow.300' : 'text'} _hover={hover_styling} fontSize="lg" onClick={() => handle_click( ViewType.List )} id="list-button" leftIcon={<ListViewIcon w={5} h={5} />}>List</Button>
		</ButtonGroup>

	);
};
export default ViewSwitcher;
