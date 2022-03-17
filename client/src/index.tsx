import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, ColorModeScript, CSSReset } from '@chakra-ui/react';
import { css, Global } from '@emotion/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
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

const query_client = new QueryClient();

ReactDOM.render(
	<QueryClientProvider client={query_client}>
		<ReactQueryDevtools initialIsOpen={false} />
		<ChakraProvider theme={theme}>
			<React.StrictMode>
				<Global styles={global_styles} />
				<ColorModeScript initialColorMode={theme.config.initialColorMode} />
				<CSSReset />
				<App />
			</React.StrictMode>
		</ChakraProvider>
	</QueryClientProvider>,
	document.getElementById( 'root' ),
);
