import {
	Link, LinkBox, ListItem, Wrap, WrapItem,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { NavLink } from '../../utils/types';

const NavItem : FC<NavLink> = ( { name, icon, url } : NavLink ) => (
	<LinkBox>
		<Link href={url} variant="ghost" fontSize="2xl">
			<ListItem px={4} py={2} _hover={{ backgroundColor: 'rgba(255, 195, 46, 0.12)', color: 'white' }} borderRadius="md">
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

export default NavItem;
