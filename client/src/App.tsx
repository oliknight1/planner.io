import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import { UserProvider } from './contexts/auth_context';

const App = () => (
	<Router>
		<UserProvider>
			<Routes>
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</UserProvider>
	</Router>
);

export default App;
