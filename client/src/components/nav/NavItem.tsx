import {
	As, Link, LinkBox, ListIcon, ListItem,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { NavLink } from '../../utils/types';

const NavItem : FC<NavLink> = ( { name, icon, url } : NavLink ) => (
	<LinkBox>
		<Link href={url} variant="ghost" fontSize="2xl">
			<ListItem px={4} py={2} _hover={{ backgroundColor: 'rgba(255, 195, 46, 0.12)', color: 'white' }} borderRadius="md">
				<ListIcon as={icon as As<any>} h={8} w={8} mr={5} />
				{ name }
			</ListItem>
		</Link>
	</LinkBox>
);

export default NavItem;
