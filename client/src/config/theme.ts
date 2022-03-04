import { extendTheme, ThemeConfig, withDefaultColorScheme } from '@chakra-ui/react';
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
		yellow: {
			50: '#FFF8E5',
			100: '#FFEBB8',
			200: '#FFDD8A',
			300: '#FFD05C',
			400: '#FFC32E',
			500: '#FFB600',
			600: '#CC9200',
			700: '#996D00',
			800: '#664900',
			900: '#332400',
		},
		brand: {
			black: '#121212',
			dark_blue: '#023047',
		},

	},
	components: {
		Input: {
			defaultProps: {
				focusBorderColor: 'yellow.400',
			},
		},
		Text: {
			baseStyle: {
				fontWeight: 'light',
			},
		},
		Button: {
			defaultProps: {
				colorScheme: 'yellow',
			},
		},
	},
} );

export default theme;
