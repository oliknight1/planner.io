import {
	Box, Container, Flex, FormControl,
	Heading, Input, InputGroup, InputLeftElement,
	Link, useColorMode, Text, Button,
} from '@chakra-ui/react';
import { EmailIcon, InfoIcon, LockIcon } from '@chakra-ui/icons';
import React, {
	FC, ReactElement, useEffect, useState,
} from 'react';

const BackgroundImage : FC = () => (
	<Box bottom={0} left={0} width="100%" zIndex={-1}>
		<svg width="100%" preserveAspectRatio="none" viewBox="0 0 520 1440" fill="none" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<linearGradient id="gradient">
					<stop offset="0%" stopColor="#FFA216" />
					<stop offset="50%" stopColor="#FFB703" />
					<stop offset="100%" stopColor="#FFD145" />
				</linearGradient>
			</defs>
			<path d="M385.5 -1.27595e-06L385.5 30C385.5 60 385.5 120 369.5 180C353.5 240 321.5 300 326.8 360C332.5 420 374.5 480 390.8 540C406.5 600 396.5 660 401.5 720C406.5 780 428.5 840 401.5 900C374.5 960 336.7 1020 315 1080C293.7 1140 351.2 1200 356.5 1260C362.2 1320 278.5 1380 268.2 1410L257.5 1440L-1.90924e-06 1440L-5.97901e-07 1410C7.1344e-07 1380 3.33612e-06 1320 5.95881e-06 1260C8.58149e-06 1200 -1.93134e-05 1140 -1.66907e-05 1080C-1.4068e-05 1020 -1.14454e-05 960 -8.82267e-06 900C-6.19999e-06 840 -3.5773e-06 780 -9.54621e-07 720C1.66806e-06 660 -2.62268e-05 600 -2.36041e-05 540C-2.09815e-05 480 1.21588e-05 420 1.47815e-05 360C1.74042e-05 300 2.00268e-05 240 2.26495e-05 180C2.52722e-05 120 2.78949e-05 60 2.92062e-05 30L-3.05176e-05 -9.66853e-06L385.5 -1.27595e-06Z" fill="url(#gradient)" />
		</svg>
	</Box>

);

interface AuthInputProps {
	placeholder: string,
	icon: ReactElement,
}

const AuthInput : FC<AuthInputProps> = ( { placeholder, icon } ) => (
	<FormControl isRequired mb={5}>
		<Flex flexDir="column" alignItems="center">
			<InputGroup w="80%">
				<InputLeftElement pointerEvents="none" top="10%" children={icon} />
				<Input size="lg" placeholder={placeholder} />
			</InputGroup>
		</Flex>
	</FormControl>
);

const Register : FC = () => {
	const [ display_name, set_display_name ] = useState<string>( '' );
	const [ email, set_email ] = useState<string>( '' );
	const [ password, set_password ] = useState<string>( '' );
	const [ password_confirm, set_password_confirm ] = useState<string>( '' );

	const { colorMode, toggleColorMode } = useColorMode();

	useEffect( () => {
		// Force light mode
		if ( colorMode === 'dark' ) {
			toggleColorMode();
		}
	}, [] );
	return (
		<Flex overflowY="hidden" maxH="100vh" alignItems="center" pos="relative">
			<Button pos="absolute" right={10} top={10} px={8}>Log in</Button>
			<BackgroundImage />
			<Container maxW="container.xl" alignItems="right" centerContent>
				<Box maxW="lg">
					<Heading textAlign="center" fontWeight="light" pb={10}>
						Create an account
					</Heading>
					<form>
						<Flex flexDir="column" alignItems="center">
							<AuthInput placeholder="Display Name" icon={<InfoIcon color="gray.300" />} />
							<AuthInput placeholder="Email" icon={<EmailIcon color="gray.300" />} />
							<AuthInput placeholder="Password" icon={<LockIcon color="gray.300" />} />
							<AuthInput placeholder="Confirm Password" icon={<LockIcon color="gray.300" />} />
							<Button type="submit" w="fit-content" mt={5}>
								Register
							</Button>
						</Flex>
					</form>
					<Text textAlign="center" mt={6}>
						Already have an account?
						<Link color="yellow.500" href="/login" fontWeight="semibold"> Log in</Link>
					</Text>
				</Box>
			</Container>
		</Flex>
	);
};
export default Register;