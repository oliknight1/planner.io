import { InfoIcon, EmailIcon, LockIcon } from '@chakra-ui/icons';
import React from 'react';
import { FormType } from '../utils/enums';
import AuthForm from './AuthForm';
import AuthInput from './AuthInput';

const Register = () => (
	<AuthForm form_type={FormType.Register}>
		<AuthInput placeholder="Display Name" icon={<InfoIcon color="gray.300" />} />
		<AuthInput placeholder="Email" icon={<EmailIcon color="gray.300" />} />
		<AuthInput placeholder="Password" icon={<LockIcon color="gray.300" />} />
		<AuthInput placeholder="Confirm Password" icon={<LockIcon color="gray.300" />} />
	</AuthForm>
);

export default Register;
