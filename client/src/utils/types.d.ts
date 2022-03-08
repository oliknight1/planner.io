import React from 'react';

export interface User {
	display_name: string,
	id: string,
	token: string
}

export interface UserContextI {
	user: User,
	set_user: React.Dispatch<React.SetStateAction<User>>
}
