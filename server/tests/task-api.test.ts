import supertest from 'supertest';
import mongoose from 'mongoose';
import { app } from '../app';
import * as db from './helpers/test_db_helper';
import * as helpers from './helpers/test_helper';
import { Task } from '../models/task';
import { TaskSchema } from '../utils/types';

const api = supertest( app );

beforeAll( async () => {
	await db.connect();
	await Task.deleteMany( {} );

	const task_data : TaskSchema = {
		title: 'Test Task',
		body_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel gravida tellus. Aenean eu cursus lacus. Sed fermentum augue at pulvinar semper. Phasellus vel justo magna. Phasellus vitae vulputate dolor, nec pellentesque risus. Nunc placerat metus quis hendrerit tristique.',
		users: [ new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId() ],
		project: new mongoose.Types.ObjectId(),
		tags: [ 'Test tag 1', 'Test tag 2' ],
		column: 'backlog',
		due_date: new Date(),
		dependant_tasks: [ new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId() ],
	};
	const task = await new Task( task_data );
	await task.save();
} );

afterAll( async () => {
	await db.close();
} );

describe( 'Testing task GET routes', () => {
	test( 'Task is successfully retrieved', async () => {
		const task_to_find = await helpers.get_target_task();

		const response = await api
			.get( `/api/tasks/id/${task_to_find.id}` )
			.expect( 200 )
			.expect( 'Content-type', /application\/json/ );

		expect( response.body ).toEqual( JSON.parse( JSON.stringify( task_to_find ) ) );
	} );
	test( 'Return 404 when no task found', async () => {
		const project = await helpers.get_target_project();
		const real_id = project.id;
		const fake_id = helpers.generate_fake_id( real_id );

		const response = await api
			.get( `/api/tasks/id/${fake_id}` )
			.expect( 404 )
			.expect( 'Content-type', /application\/json/ );

		expect( response.body.error ).toEqual( 'No task found' );
	} );
} );
// describe( 'Testing task POST routes' );
// describe( 'Testing task PATCH routes' );
// describe( 'Testing task DELETE routes' );
