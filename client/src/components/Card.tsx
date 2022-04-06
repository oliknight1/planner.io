import { Box, useColorMode } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { FC } from 'react';

const Card : FC = ( { children } ) => {
	const MotionCard = motion( Box );
	const { colorMode } = useColorMode();
	return (
		<MotionCard
			whileHover={{ borderColor: '#FFB600', scale: 1.05 }}
			borderColor={colorMode === 'dark' ? '#1F1F1F' : '#FFFFFF'}
			borderWidth="2px"
			borderRadius="lg"
			boxShadow="lg"
			w="sm"
			p={4}
			bg={colorMode === 'dark' ? '#181818' : '#FFFFFF'}
		>
			{children}
		</MotionCard>

	);
};
export default Card;
