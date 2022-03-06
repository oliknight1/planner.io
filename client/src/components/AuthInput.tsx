import {
	FormControl, Flex, InputGroup, InputLeftElement, Input,
} from '@chakra-ui/react';
import React, { FC, ReactElement } from 'react';

interface AuthInputProps {
	placeholder: string,
	icon: ReactElement,
	set_state: React.Dispatch<React.SetStateAction<any>>,
	type: string
}
const AuthInput : FC<AuthInputProps> = ( {
	placeholder, icon, set_state, type,
} ) => (
	<FormControl isRequired mb={5}>
		<Flex flexDir="column" alignItems="center">
			<InputGroup w="80%">
				<InputLeftElement pointerEvents="none" top="10%" children={icon} />
				<Input size="lg" type={type} placeholder={placeholder} onChange={( ( e ) => set_state( e.currentTarget.value ) )} />
			</InputGroup>
		</Flex>
	</FormControl>
);

export default AuthInput;
