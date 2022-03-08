import React from 'react';

export interface User {
	display_name: string,
	id: string,
	token: string
}

export interface UserRequest {
	email: string,
	password: string,
	display_name?: string,
	password_confirm?: string

}

export interface UserContextI {
	user: User,
	set_user: React.Dispatch<React.SetStateAction<User>>
}
