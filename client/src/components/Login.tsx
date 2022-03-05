import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import React from 'react';
import { FormType } from '../utils/enums';
import AuthForm from './AuthForm';
import AuthInput from './AuthInput';

const Login = () => (
	<AuthForm form_type={FormType.Login}>
		<AuthInput placeholder="Email" icon={<EmailIcon color="gray.300" />} />
		<AuthInput placeholder="Password" icon={<LockIcon color="gray.300" />} />
	</AuthForm>
);

export default Login;
