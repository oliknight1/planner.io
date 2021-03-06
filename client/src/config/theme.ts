import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config : ThemeConfig = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
};

const focus_colour = '0 0 0 1px rgba(204, 146, 0, 0.8)';

const theme = extendTheme( {
	config,
	semanticTokens: {
		colors: {
			text: {
				default: 'gray.800',
				_dark: 'whiteAlpha.900',
			},
		},
	},
	styles: {
		global: ( props : any ) => ( {
			body: {
				bg: mode( '#F4F4F4', '#1F1F1F' )( props ),
				fontWeight: 'light',
			},
		} ),
	},
	colors: {
		yellow: {
			50: '#FFFFFF',
			100: '#FFEBB8',
			200: '#FFC32E',
			300: '#FFB600',
			400: '#FFB600',
			500: '#FFB600',
			600: '#FFB600',
			700: '#D49700',
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
		Link: {
			baseStyle: {
				_hover: {
					textDecoration: 'none',
				},
			},
		},
		Button: {
			defaultProps: {
				colorScheme: 'yellow',
			},
			variants: {
				'dropdown-trigger': {
					fontWeight: 'light',
					_focus: {
						boxShadow: focus_colour,
					},
				},
			},
		},
	},
} );

export default theme;
