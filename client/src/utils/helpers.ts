import { useBreakpoint } from '@chakra-ui/react';

export const is_mobile_breakpoint = () : boolean => {
	const current_breakpoint = useBreakpoint();
	return [ 'base', 'sm' ].includes( current_breakpoint as string );
};
