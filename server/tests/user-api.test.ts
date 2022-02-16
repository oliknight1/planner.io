import supertest from 'supertest';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { app } from '../app';
import { UserModel } from '../models/user';
import * as helpers from './test_helper';
import { User } from '../utils/types';

const api = supertest( app );

beforeEach( async () => {
	// Delete all users before test
	await UserModel.deleteMany( {} );

	const password_hash = await bcrypt.hash( 'password', 10 );
	const user_data : User = {
		display_name: 'root',
		email: 'root@email.com',
		password: password_hash,
		projects: [],
		tasks: [],
	};
	const user = new UserModel( user_data );

	await user.save();
} );
describe( 'Testing the user GET routes', () => {
	test( 'User is returned as json', async () => {
		await api
			.get( '/api/users' )
			.expect( 200 )
			.expect( 'Content-type', /application\/json/ );
	} );

	test( 'One user is returned when getting user by ID', async () => {
		const user_to_view = await helpers.get_target_user();

		const response = await api.get( `/api/users/${user_to_view.id}` );
		expect( response.body ).toHaveLength( 1 );
	} );

	test( 'Correct user is returned when getting user by ID', async () => {
		const user_to_view = await helpers.get_target_user();

		const result_user = await api
			.get( `/api/users/${user_to_view.id}` )
			.expect( 200 )
			.expect( 'Content-Type', /application\/json/ );

		const processed_user_to_view = JSON.parse( JSON.stringify( user_to_view ) );
		expect( result_user.body ).toEqual( processed_user_to_view );
	} );

	// test( 'Correct user is returned when getting user by email', async () => {} );
	//
	// test( '400 error is thrown when wrong ID is supplied' );
	//
	// test( '400 error is thrown when invalid email is supplied' );
	//
	// test( '404 error is thrown when user is not found' );
} );

describe( 'Testing user creation', () => {
	test( 'User creation succeeds and adds user to database', async () => {
		const users_pre_test = await helpers.users_in_db();

		const new_user : User = {
			display_name: 'oliknight',
			email: 'oli@email.com',
			password: 'password1',
			projects: [],
			tasks: [],
		};

		await api
			.post( '/api/users' )
			.send( new_user )
			.expect( 201 )
			.expect( 'Content-Type', /application\/json/ );

		const users_post_test = await helpers.users_in_db();
		expect( users_post_test ).toHaveLength( users_pre_test.length + 1 );

		const emails = users_post_test.map( ( user : User ) => user.email );
		expect( emails ).toContain( new_user.display_name );
	} );

	test( 'User creation fails with correct status code when non-unique display_name', async () => {
		const users_pre_test = await helpers.users_in_db();

		const new_user : User = {
			display_name: 'root',
			email: 'oli@email.com',
			password: 'password1',
			projects: [],
			tasks: [],
		};

		const result = await api
			.post( '/api/users' )
			.send( new_user )
			.expect( 400 )
			.expect( 'Content-Type', /application\/json/ );

		expect( result.body.error ).toContain( 'display_name must be unique' );

		const users_post_test = await helpers.users_in_db();
		expect( users_post_test.length ).toEqual( users_pre_test.length );
	} );

	test( 'User creation fails with correct status code when non-unique email', async () => {
		const users_pre_test = await helpers.users_in_db();

		const new_user : User = {
			display_name: 'oliknight',
			email: 'root@email.com',
			password: 'password1',
			projects: [],
			tasks: [],
		};

		const result = await api
			.post( '/api/users' )
			.send( new_user )
			.expect( 400 )
			.expect( 'Content-Type', /application\/json/ );

		expect( result.body.error ).toContain( 'account with email already exists' );

		const users_post_test = await helpers.users_in_db();
		expect( users_post_test.length ).toEqual( users_pre_test );
	} );
} );

afterAll( () => {
	mongoose.connection.close();
} );
