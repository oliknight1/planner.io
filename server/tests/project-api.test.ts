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
			name: 'Test Project',
			tasks: [ new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId() ],
			users: [ new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId() ],
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

		expect( response.body.name ).toEqual( 'Test Project' );

		const processed_project_to_find = JSON.parse( JSON.stringify( project_to_find ) );
		expect( response.body ).toEqual( processed_project_to_find );
	} );

	test( 'Returns 404 when no project is found', async () => {
		const project = await helpers.get_target_project();
		console.log( 'sheesh', project );
		const real_id = project.id;
		const fake_id = helpers.generate_fake_id( real_id );

		const response = await api
			.get( `/api/projects/id/${fake_id}` )
			.expect( 404 )
			.expect( 'Content-type', /application\/json/ );

		expect( response.body.error ).toContain( 'Project not found' );
	} );
} );

//
// describe( 'Testing POST routes', () => {
//   test( 'Project is successfully created' );
//
//   test( 'Project creation fails with empty name' );
// } );
//
// describe( 'Testing PATCH routes', () => {
//   test( 'Project is successfully patched' );
//   test( 'PATCH fails if no data is provided' );
// } );
