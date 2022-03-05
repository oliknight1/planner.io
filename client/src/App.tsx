import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

const App = () => (
	<Router>
		<Routes>
			<Route path="/register" element={<Register />} />
			<Route path="/login" element={<Login />} />

		</Routes>
	</Router>
);

export default App;
