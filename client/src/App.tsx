import React, { FC } from 'react';
import {
	BrowserRouter as Router,
} from 'react-router-dom';
import Routing from './components/Routing';
import { UserProvider } from './contexts/auth_context';

const App = () => (
	<Router>
		<UserProvider>
			<Routing />
		</UserProvider>
	</Router>
);

export default App;
