import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, ColorModeScript, CSSReset } from '@chakra-ui/react';
import { css, Global } from '@emotion/react';
import theme from './config/theme';
import 'focus-visible/dist/focus-visible';
import App from './App';

// Hide focus indicator if clicked by mouse
const global_styles = css`
  .js-focus-visible :focus:not([data-focus-visible-added]) {
     outline: none;
     box-shadow: none;
   }
`;

ReactDOM.render(
	<ChakraProvider theme={theme}>
		<React.StrictMode>
			<Global styles={global_styles} />
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			<CSSReset />
			<App />
		</React.StrictMode>
	</ChakraProvider>,
	document.getElementById( 'root' ),
);
