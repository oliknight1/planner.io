import {
	Box, Container, Flex, Heading,
	Link, useColorMode, Text, Button, useBreakpoint,
} from '@chakra-ui/react';
import React, {
	FC, useEffect, useState,
} from 'react';
import { FormType } from '../utils/enums';

const BackgroundImage : FC = () => (
	<Box width="100%" zIndex={-1}>
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

const BackgroundImageVertical : FC = () => (
	<Box pos="fixed" bottom={0} width="100%" zIndex={-1}>
		<svg width="100%" preserveAspectRatio="none" viewBox="0 0 1441 416" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M0.345093 29.8451L30.3451 29.8451C60.3451 29.8451 120.345 29.8451 180.345 45.8451C240.345 61.8451 300.345 93.8451 360.345 88.5451C420.345 82.8451 480.345 40.8451 540.345 24.5451C600.345 8.84511 660.345 18.8451 720.345 13.8451C780.345 8.84512 840.345 -13.1549 900.345 13.8451C960.345 40.8451 1020.35 78.6452 1080.35 100.345C1140.35 121.645 1200.35 64.1452 1260.35 58.8452C1320.35 53.1452 1380.35 136.845 1410.35 147.145L1440.35 157.845V415.345H1410.35C1380.35 415.345 1320.35 415.345 1260.35 415.345C1200.35 415.345 1140.35 415.345 1080.35 415.345C1020.35 415.345 960.345 415.345 900.345 415.345C840.345 415.345 780.345 415.345 720.345 415.345C660.345 415.345 600.345 415.345 540.345 415.345C480.345 415.345 420.345 415.345 360.345 415.345C300.345 415.345 240.345 415.345 180.345 415.345C120.345 415.345 60.3451 415.345 30.3451 415.345L0.345101 415.345L0.345093 29.8451Z" fill="#FFB703" />
		</svg>
	</Box>

);

interface AuthFormProps {
	form_type: FormType
}

const AuthForm : FC<AuthFormProps> = ( { form_type, children } ) => {
	const [ display_name, set_display_name ] = useState<string>( '' );
	const [ email, set_email ] = useState<string>( '' );
	const [ password, set_password ] = useState<string>( '' );
	const [ password_confirm, set_password_confirm ] = useState<string>( '' );

	const { colorMode, toggleColorMode } = useColorMode();

	const current_breakpoint = useBreakpoint();
	const is_mobile_breakpoint = [ 'base', 'sm' ].includes( current_breakpoint as string );

	useEffect( () => {
		// Force light mode
		if ( colorMode === 'dark' ) {
			toggleColorMode();
		}
	}, [] );

	return (
		<Flex
			flexDir={is_mobile_breakpoint ? 'column-reverse' : 'row'}
			overflowY="hidden"
			maxH="100vh"
			alignItems="center"
		>
			<Button pos="absolute" right={10} top={10} px={8}>
				{ form_type === 0 ? ( 'Register' )
					: ( 'Login' )}
			</Button>
			{
				is_mobile_breakpoint
					&& <BackgroundImageVertical />
			}
			{
				!is_mobile_breakpoint
					&& <BackgroundImage />
			}
			<Container maxW="container.xl" mt={32}>
				<Box maxW={is_mobile_breakpoint ? '100%' : 'lg'}>
					<Heading textAlign="center" fontWeight="light" pb={10}>
						{
							form_type === 0 ? ( 'Login to your account' )
								: ( 'Create an account' )
						}
					</Heading>
					<form>
						<Flex flexDir="column" alignItems="center">
							{ children }
							<Button type="submit" w="fit-content" mt={5}>
								{
									form_type === 0 ? ( 'Login' )
										: ( 'Register' )
								}
							</Button>
						</Flex>
					</form>
					<Text textAlign="center" mt={6}>
						{
							form_type === 0 ? ( 'Don\'t have an account?' )
								: ( 'Already have an account?' )
						}
						{
							form_type === 0 ? ( <Link color="yellow.500" href="/register">Register</Link> )
								: ( <Link color="yellow.500" href="/login"> Login</Link> )
						}
					</Text>
				</Box>
			</Container>
		</Flex>
	);
};
export default AuthForm;
