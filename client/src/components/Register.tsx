import { InfoIcon, EmailIcon, LockIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { AuthController } from '../controllers/AuthController';
import { FormType } from '../utils/enums';
import AuthForm from './AuthForm';
import AuthInput from './AuthInput';

const Register = () => {
	const [ display_name, set_display_name ] = useState<string>( '' );
	const [ email, set_email ] = useState<string>( '' );
	const [ password, set_password ] = useState<string>( '' );
	const [ password_confirm, set_password_confirm ] = useState<string>( '' );
	const [ errors, set_errors ] = useState<string[]>( [] );

	const handle_submit = async () => {
		set_errors( [] );
		if ( password !== password_confirm ) {
			set_errors( [ ...errors, 'Passwords do not match' ] );
			throw new Error( 'Passwords do not match' );
		}
		await AuthController.register( display_name, email, password, password_confirm );
		const errors_list : string[] = AuthController.get_errors();
		set_errors( [ ...errors, ...errors_list ] );
	};

	return (
		<AuthForm form_type={FormType.Register} form_submit={handle_submit} errors={errors}>
			<AuthInput set_state={set_display_name} type="text" placeholder="Display Name" icon={<InfoIcon color="gray.300" />} />
			<AuthInput set_state={set_email} type="email" placeholder="Email" icon={<EmailIcon color="gray.300" />} />
			<AuthInput set_state={set_password} type="password" placeholder="Password" icon={<LockIcon color="gray.300" />} />
			<AuthInput set_state={set_password_confirm} type="password" placeholder="Confirm Password" icon={<LockIcon color="gray.300" />} />
		</AuthForm>
	);
};

export default Register;
