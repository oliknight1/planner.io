import React, { FC, ReactElement } from 'react';
import {
	Navigate, Route, Routes,
} from 'react-router-dom';
import { useUser } from '../contexts/auth_context';
import AllProjects from './AllProjects';
import ErrorPage from './ErrorPage';
import Home from './Home';
import Login from './Login';
import ProjectPage from './project_page/ProjectPage';
import Register from './Register';

const CheckAuth : FC<{ target: ReactElement }> = ( { target } ) => {
	const { user, loading } = useUser();
	if ( !loading && user !== undefined ) {
		return user ? target : <Navigate to="/login" />;
	}
	return null;
};

const Routing : FC = () => {
	const { loading } = useUser();
	if ( !loading ) {
		return (
			<Routes>
				<Route path="*" element={<ErrorPage />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/" element={( <CheckAuth target={<Home />} /> )}>
					<Route path="projects" element={<AllProjects />} />
					<Route path="/projects/:id" element={<ProjectPage />} />
				</Route>
			</Routes>
		);
	}
	return null;
};

export default Routing;
