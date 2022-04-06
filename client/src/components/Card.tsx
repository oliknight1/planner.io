import { Box, BoxProps, useColorMode } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { FC } from 'react';

const Card : FC<BoxProps> = ( { children, ...props } ) => {
	const MotionCard = motion( Box );
	const { colorMode } = useColorMode();
	return (
		<MotionCard
			whileHover={{ borderColor: '#FFB600', scale: 1.05 }}
			borderColor={colorMode === 'dark' ? '#181818' : '#FFFFFF'}
			borderWidth="2px"
			borderRadius="lg"
			boxShadow="lg"
			w="sm"
			p={4}
			bg={colorMode === 'dark' ? '#181818' : '#FFFFFF'}
			{...props}
		>
			{children}
		</MotionCard>

	);
};
export default Card;
