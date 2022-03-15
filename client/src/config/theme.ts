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
				fontWeight: 'light',
			},
		} ),
	},
	colors: {
		yellow: {
			50: '#FFF8E5',
			100: '#FFEBB8',
			200: '#FFC32E',
			300: '#FFB600',
			400: '#CC9200',
			500: '#996D00',
			600: '#664900',
			700: '#332400',
		},
		black: {
			900: '#121212',
		},
		brand: {
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
		Link: {
			baseStyle: {
				_hover: {
					textDecoration: 'none',
					color: 'yellow.200',
				},
			},
		},
	},
} );

export default theme;
