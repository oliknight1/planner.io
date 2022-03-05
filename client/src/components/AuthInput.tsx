import {
	FormControl, Flex, InputGroup, InputLeftElement, Input,
} from '@chakra-ui/react';
import React, { FC, ReactElement } from 'react';

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

export default AuthInput;
