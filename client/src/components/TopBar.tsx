import { HamburgerIcon } from '@chakra-ui/icons';
import {
	Heading, IconButton, Box, Avatar, Flex, useColorMode,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { useNav } from '../contexts/nav_context';
import { is_mobile_breakpoint } from '../utils/helpers';

interface TopBarProps {
	title: string,
	is_project_page: boolean
}
const TopBar : FC<TopBarProps> = ( { title, is_project_page } ) => {
	const { toggle_state } = useNav();
	const { colorMode } = useColorMode();

	return (
		<Box px={6} py={6} pos="relative" background={colorMode === 'dark' ? 'black.900' : '#FFFFFF'} maxW="100%">
			{
				is_mobile_breakpoint()
				&& (
					<IconButton
						pos="absolute"
						top="25%"
						left={6}
						variant="ghost"
						color="white"
						aria-label="Open navbar"
						icon={<HamburgerIcon w={6} h={6} />}
						onClick={toggle_state}
					/>
				)
			}
			<Flex alignItems="center" ml={is_mobile_breakpoint() ? 16 : 0}>
				{
					is_project_page && <Avatar name={title} borderRadius="md" mr={6} />
				}
				<Heading fontWeight="normal" textAlign="center" size="lg">{title}</Heading>
			</Flex>
		</Box>
	);
};

export default TopBar;
