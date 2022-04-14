import {
	Link, LinkBox, ListItem, useColorMode, Wrap, WrapItem,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useNav } from '../../contexts/nav_context';
import { is_mobile_breakpoint } from '../../utils/helpers';
import { NavLink } from '../../utils/types';

const NavItem : FC<NavLink> = ( { name, icon, url } : NavLink ) => {
	const { colorMode } = useColorMode();
	const hover_styling = {
		backgroundColor: colorMode === 'dark' ? 'rgba(255,182,0,0.12)' : 'rgba(255,255,255,0.9)',
		color: colorMode === 'dark' ? 'white' : 'black',
	};
	const { toggle_state } = useNav();
	return (
		<LinkBox>
			<Link as={RouterLink} to={url} fontSize="2xl">
				<ListItem px={2} py={2} _hover={hover_styling} borderRadius="md" onClick={is_mobile_breakpoint() ? toggle_state : null}>
					<Wrap align="center" spacing={6}>
						<WrapItem>
							{ icon }
						</WrapItem>
						<WrapItem>
							{ name }
						</WrapItem>
					</Wrap>
				</ListItem>
			</Link>
		</LinkBox>
	);
};

export default NavItem;
