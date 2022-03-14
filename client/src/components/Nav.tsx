import {
	Box, Container, Flex, IconButton,
} from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import Logo from './Logo';

const MotionBox = motion( Box );

const Nav : FC = () => {
	const [ open, set_open ] = useState<boolean>( true );

	const variants = {
		closed: { x: -500 },
		open: { x: 0 },
	};
	return (
		<MotionBox h="100vh" maxW="xs" background="black.900" variants={variants} animate={open ? 'open' : 'closed'}>
			<Container pt={3}>
				<Flex w="100%" alignItems="center" justifyContent="space-between">
					<Box w="70%">
						<Logo />
					</Box>
					<IconButton
						aria-label="Close navigaton"
						variant="ghost"
						icon={<CloseIcon w={6} h={6} />}
						onClick={() => set_open( false )}
					/>
				</Flex>
			</Container>
		</MotionBox>
	);
};

export default Nav;
