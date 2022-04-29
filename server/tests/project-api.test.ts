import supertest from 'supertest';
import mongoose from 'mongoose';
import { app } from '../app';
import { Project } from '../models/project';
import * as helpers from './helpers/test_helper';
import * as db from './helpers/test_db_helper';
import { ProjectSchema } from '../utils/types';

const api = supertest( app );

beforeAll( async () => {
	await db.connect();

	await Project.deleteMany( {} );
} );

afterAll( async () => {
	await db.close();
} );

describe( 'Testing project GET routes', () => {
	beforeAll( async () => {
		// Create project for GET route to test

		const project_data : ProjectSchema = {
			title: 'Test Project',
			tasks: [ new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId() ],
			users: [ new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId() ],
			columns: [],
		};

		const project = await new Project( project_data );
		await project.save();
	} );

	test( 'Project is successfully retrieved', async () => {
		const project_to_find = await helpers.get_target_project();

		const response = await api
			.get( `/api/projects/id/${project_to_find.id}` )
			.expect( 200 )
			.expect( 'Content-Type', /application\/json/ );

		expect( response.body.title ).toEqual( 'Test Project' );

		const processed_project_to_find = JSON.parse( JSON.stringify( project_to_find ) );
		expect( response.body ).toEqual( processed_project_to_find );
	} );

	test( 'Returns 404 when no project is found', async () => {
		const project = await helpers.get_target_project();
		const real_id = project.id;
		const fake_id = helpers.generate_fake_id( real_id );

		const response = await api
			.get( `/api/projects/id/${fake_id}` )
			.expect( 404 )
			.expect( 'Content-type', /application\/json/ );

		expect( response.body.error ).toContain( 'Project not found' );
	} );
} );

describe( 'Testing project POST routes', () => {
	test( 'Project is successfully created', async () => {
		const projects_pre_test = await helpers.projects_in_db();

		const new_project : ProjectSchema = {
			title: 'Test project',
			users: [],
			tasks: [ new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId() ],
			columns: [],
		};

		await api
			.post( '/api/projects' )
			.send( new_project )
			.expect( 201 )
			.set( 'Authorization', `Bearer ${helpers.token}` )
			.expect( 'Content-type', /application\/json/ );

		const projects_post_test = await helpers.projects_in_db();
		expect( projects_post_test.length ).toEqual( projects_pre_test.length + 1 );

		const titles = projects_post_test.map( ( project : ProjectSchema ) => project.title );
		expect( titles ).toContain( new_project.title );

		expect( projects_post_test[projects_post_test.length - 1].users )
			.toEqual( [ helpers.token_id ] );
	} );

	test( 'Project creation fails if not authorized', async () => {
		const projects_pre_test = await helpers.projects_in_db();

		const new_project : ProjectSchema = {
			title: 'Test project',
			users: [ new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId() ],
			tasks: [ new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId() ],
			columns: [],
		};

		const response = await api
			.post( '/api/projects' )
			.send( new_project )
			.expect( 401 )
			.expect( 'Content-type', /application\/json/ );

		expect( response.body.error ).toContain( 'Auth token missing or invalid' );

		const projects_post_test = await helpers.projects_in_db();
		expect( projects_post_test.length ).toEqual( projects_pre_test.length );
	} );
	test( 'Project creation fails with empty name', async () => {
		const projects_pre_test = await helpers.projects_in_db();

		const new_project : ProjectSchema = {
			title: '',
			users: [ new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId() ],
			tasks: [ new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId() ],
			columns: [],
		};

		const response = await api
			.post( '/api/projects' )
			.send( new_project )
			.expect( 400 )
			.set( 'Authorization', `Bearer ${helpers.token}` )
			.expect( 'Content-type', /application\/json/ );

		const projects_post_test = await helpers.projects_in_db();
		expect( projects_post_test.length ).toEqual( projects_pre_test.length );

		expect( response.body.error ).toContain( 'Name cannot be empty' );
	} );
} );

describe( 'Testing project PATCH routes', () => {
	beforeAll( async () => {
		const project_data : ProjectSchema = {
			title: 'Test Project',
			tasks: [ new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId() ],
			users: [ new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId() ],
			columns: [],
		};

		const project = await new Project( project_data );
		await project.save();
	} );
	test( 'Project is successfully patched', async () => {
		const project = await helpers.get_target_project();
		const { id } = project;

		await api.patch( `/api/projects/id/${id}` )
			.send( { title: 'new name' } )
			.set( 'Authorization', `Bearer ${helpers.token}` )
			.expect( 200 );

		const project_post_patch = await helpers.get_target_project();
		expect( project_post_patch.title ).toEqual( 'new name' );
	} );

	test( '404 error is sent if project not found', async () => {
		const project = await helpers.get_target_project();
		const real_id = project.id;
		const fake_id = helpers.generate_fake_id( real_id );

		const response = await api
			.patch( `/api/projects/id/${fake_id}` )
			.send( { title: 'New name' } )
			.expect( 404 )
			.set( 'Authorization', `Bearer ${helpers.token}` )
			.expect( 'Content-type', /application\/json/ );

		const project_post_patch = await helpers.get_target_project();
		expect( project_post_patch ).toEqual( project );

		expect( response.body.error ).toContain( 'Project not found' );
	} );
	test( 'PATCH fails if no data is provided', async () => {
		const project = await helpers.get_target_project();
		const { id } = project;

		const response = await api
			.patch( `/api/projects/id/${id}` )
			.send( { title: '' } )
			.expect( 400 )
			.set( 'Authorization', `Bearer ${helpers.token}` )
			.expect( 'Content-type', /application\/json/ );

		const project_post_patch = await helpers.get_target_project();
		expect( project_post_patch ).toEqual( project );

		expect( response.body.error ).toContain( 'No data provided' );
	} );
	test( 'PATCH fails if not authorized', async () => {
		const project = await helpers.get_target_project();
		const { id } = project;

		await api.patch( `/api/projects/id/${id}` )
			.send( { title: 'new name' } )
			.expect( 401 );

		const project_post_patch = await helpers.get_target_project();
		expect( project_post_patch ).toEqual( project );
	} );
} );

describe( 'Testing project DELETE routes', () => {
	beforeAll( async () => {
		const project_data : ProjectSchema = {
			title: 'Test Project',
			tasks: [ new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId() ],
			users: [ new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId() ],
			columns: [],
		};

		const project = await new Project( project_data );
		await project.save();
	} );

	test( 'Successfull deletion', async () => {
		const projects_pre_test = await helpers.projects_in_db();
		const project_to_delete = await helpers.get_target_project();
		const { id } = project_to_delete;

		await api
			.delete( `/api/projects/id/${id}` )
			.set( 'Authorization', `Bearer ${helpers.token}` )
			.expect( 204 );

		const projects_post_test = await helpers.projects_in_db();

		expect( projects_post_test.length ).toEqual( projects_pre_test.length - 1 );
	} );
} );
