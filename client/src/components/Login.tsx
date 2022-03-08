import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { FormType } from '../utils/enums';
import AuthForm from './AuthForm';
import AuthInput from './AuthInput';

const Login = () => {
	const [ email, set_email ] = useState<string>( '' );
	const [ password, set_password ] = useState<string>( '' );
	const [ error, set_error ] = useState<string>( '' );

	const handle_submit = () => {
		console.log( 'run' );
	};
	return (
		<AuthForm form_type={FormType.Login} form_submit={handle_submit} error={error}>
			<AuthInput set_state={set_email} type="email" placeholder="Email" icon={<EmailIcon color="gray.300" />} />
			<AuthInput set_state={set_password} type="password" placeholder="Password" icon={<LockIcon color="gray.300" />} />
		</AuthForm>
	);
};
export default Login;
