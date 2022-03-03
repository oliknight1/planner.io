import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config : ThemeConfig = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
};

const theme = extendTheme( {
	config,
	styles: {
		global: ( props : any ) => ( {
			body: {
				bg: mode( '#ffffff', '#1F1F1F' )( props ),
			},
		} ),
	},
	colors: {
		brand: {
			yellow: '#FFB703',
			black: '#121212',
			dark_blue: '#023047',
		},
	},
} );

export default theme;
