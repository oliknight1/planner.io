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

export interface Task {
	id?: string,
	title: string,
	body_text: string,
	users: string[] | User[],
	project: string,
	tags: string[],
	column: string,
	due_date?: Date,
	dependant_tasks?: Task[]

}

export interface TaskColumnI {
		id: number
		title: string,
		tasks : Task[],
}

export interface Project {
	id: string,
	title: string,
	tasks: Task[],
	users: User[],
	columns: TaskColumnI[]
}
