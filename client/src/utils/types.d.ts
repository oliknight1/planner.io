import { As } from '@chakra-ui/react';
import { ReactElement } from 'react';

export interface User {
	display_name: string,
	email: string
	id: string,
	token: string
}

export interface NavLink {
	name: string,
	icon : As<any> | ReactElement
	url: string
}

export interface Project {
	id: string,
	title: string,
	tasks: string[],
	users: string[]
}
