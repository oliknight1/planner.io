import { InfoIcon, EmailIcon, LockIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/auth_context';
import { FormType } from '../utils/enums';
import AuthForm from './AuthForm';
import AuthInput from './AuthInput';

const Register = () => {
	const [ display_name, set_display_name ] = useState<string>( '' );
	const [ email, set_email ] = useState<string>( '' );
	const [ password, set_password ] = useState<string>( '' );
	const [ password_confirm, set_password_confirm ] = useState<string>( '' );

	const { register, error, loading } = useUser();
	const navigate = useNavigate();

	const handle_submit = async () => {
		await register( display_name, email, password, password_confirm );
		navigate( '/' );
	};

	return (
		<AuthForm
			form_type={FormType.Register}
			form_submit={handle_submit}
			error={error}
			loading={loading}
		>
			<AuthInput set_state={set_display_name} type="text" placeholder="Display Name" icon={<InfoIcon color="gray.300" />} />
			<AuthInput set_state={set_email} type="email" placeholder="Email" icon={<EmailIcon color="gray.300" />} />
			<AuthInput set_state={set_password} type="password" placeholder="Password" icon={<LockIcon color="gray.300" />} />
			<AuthInput set_state={set_password_confirm} type="password" placeholder="Confirm Password" icon={<LockIcon color="gray.300" />} />
		</AuthForm>
	);
};

export default Register;
