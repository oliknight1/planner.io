import {
	Link, LinkBox, ListItem, useColorMode, Wrap, WrapItem,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { NavLink } from '../../utils/types';

const NavItem : FC<NavLink> = ( { name, icon, url } : NavLink ) => {
	const { colorMode } = useColorMode();
	const hover_styling = {
		backgroundColor: colorMode === 'dark' ? 'rgba(255,182,0,0.12)' : 'rgba(255,255,255,0.9)',
		color: colorMode === 'dark' ? 'white' : 'black',
	};
	return (
		<LinkBox>
			<Link as={RouterLink} to={url} fontSize="2xl">
				<ListItem px={2} py={2} _hover={hover_styling} borderRadius="md">
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
