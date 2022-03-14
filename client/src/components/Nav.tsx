import {
	Box, Container, IconButton, Image,
} from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

const MotionBox = motion( Box );

const Nav : FC = () => {
	const [ open, set_open ] = useState<boolean>( true );

	const variants = {
		closed: { x: -500 },
		open: { x: 0 },
	};
	return (
		<MotionBox h="100vh" maxW="xs" background="black.900" variants={variants} animate={open ? 'open' : 'closed'}>
			<Container>
				<IconButton
					aria-label="Close navigaton"
					variant="ghost"
					icon={<CloseIcon />}
					onClick={() => set_open( !open )}
				/>
			</Container>
		</MotionBox>
	);
};

export default Nav;
