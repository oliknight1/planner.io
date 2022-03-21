import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useUser } from '../contexts/auth_context';
import Home from './Home';
import Login from './Login';
import Register from './Register';

const CheckAuth : FC = () => {
	const { user, loading } = useUser();
	if ( !loading && user !== undefined ) {
		return user ? <Home /> : <Navigate to="/login" />;
	}
	return null;
};

const Routing : FC = () => {
	const { loading } = useUser();
	if ( !loading ) {
		return (
			<Routes>
				<Route
					path="/"
					element={( <CheckAuth /> )}
				/>
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		);
	}
	return null;
};

export default Routing;
