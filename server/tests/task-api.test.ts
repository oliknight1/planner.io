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
		const project = await helpers.get_target_task();
		const real_id = project.id;
		const fake_id = helpers.generate_fake_id( real_id );

		const response = await api
			.get( `/api/tasks/id/${fake_id}` )
			.expect( 404 )
			.expect( 'Content-type', /application\/json/ );

		expect( response.body.error ).toEqual( 'Task not found' );
	} );
} );
describe( 'Testing task DELETE routes', () => {
	test( 'Successfull deletion', async () => {
		const tasks_pre_test = await helpers.tasks_in_db();
		const task_to_delete = await helpers.get_target_task();
		const { id } = task_to_delete;

		await api
			.delete( `/api/tasks/id/${id}` )
			.expect( 204 );

		const tasks_post_test = await helpers.tasks_in_db;
		expect( tasks_post_test.length ).toEqual( tasks_pre_test.length - 1 );
	} );
} );
describe( 'Testing task POST routes', () => {
	test( 'Task is successfully created', async () => {
		const tasks_pre_test = await helpers.tasks_in_db();

		const new_task :TaskSchema = {
			title: 'new task',
			body_text: 'task body',
			users: [ new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId() ],
			project: new mongoose.Types.ObjectId(),
			tags: [ 'tag1', 'tag2' ],
			column: 'backlog',
			due_date: new Date(),
			dependant_tasks: [ new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId() ],
		};

		await api
			.post( '/api/tasks' )
			.send( new_task )
			.expect( 201 )
			.expect( 'Content-type', /application\/json/ );

		const tasks_post_test = await helpers.tasks_in_db();
		expect( tasks_post_test.length ).toEqual( tasks_pre_test.length + 1 );

		const titles = tasks_post_test.map( ( task: TaskSchema ) => task.title );
		expect( titles ).toContain( new_task.title );
	} );

	test( 'Task creations fails with empty title', async () => {
		const tasks_pre_test = await helpers.tasks_in_db();

		const new_task :TaskSchema = {
			title: '',
			body_text: 'task body',
			users: [ new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId() ],
			project: new mongoose.Types.ObjectId(),
			tags: [ 'tag1', 'tag2' ],
			column: 'backlog',
			due_date: new Date(),
			dependant_tasks: [ new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId() ],
		};

		const response = await api
			.post( '/api/tasks' )
			.send( new_task )
			.expect( 400 )
			.expect( 'Content-type', /application\/json/ );

		const tasks_post_test = await helpers.tasks_in_db();
		expect( tasks_post_test.length ).toEqual( tasks_pre_test.length );

		expect( response.body.error ).toContain( 'Title cannot be empty' );
	} );
} );
describe( 'Testing task PATCH routes', () => {
	test( 'Task is successfully patched', async () => {
		const task = await helpers.get_target_task();
		const { id } = task;

		await api
			.patch( `/api/tasks/id/${id}` )
			.send( { title: 'new title' } )
			.expect( 200 );

		const tasks_post_test = await helpers.get_target_task();
		expect( tasks_post_test.title ).toEqual( 'new title' );
	} );

	test( '404 error if task not found', async () => {
		const task = await helpers.get_target_task();
		const real_id = task.id;
		const id = helpers.generate_fake_id( real_id );
		await api
			.patch( `/api/tasks/id/${id}` )
			.send( { title: 'new title' } )
			.expect( 404 )
			.expect( 'Content-type', /application\/json/ );

		const tasks_post_test = await helpers.get_target_task();
		expect( tasks_post_test.title ).toEqual( task.title );
	} );
} );
