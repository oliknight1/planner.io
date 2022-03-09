import React, { FC } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { UserProvider, useUser } from './contexts/auth_context';

const CheckAuth : FC = () => {
	const { user } = useUser();
	return user ? <Home /> : <Navigate to="/login" />;
};
const App = () => (
	<Router>
		<UserProvider>
			<Routes>
				<Route
					path="/"
					element={( <CheckAuth /> )}
				/>
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</UserProvider>
	</Router>
);

export default App;
