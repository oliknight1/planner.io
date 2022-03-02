import supertest from 'supertest';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { app } from '../app';
import { User } from '../models/user';
import * as helpers from './helpers/test_helper';
import { UserSchema } from '../utils/types';
import * as db from './helpers/test_db_helper';

const api = supertest( app );

beforeAll( async () => {
	await db.connect();
	// Delete all users before test
	await User.deleteMany( {} );

	const password_hash = await bcrypt.hash( 'password', 10 );
	const user_data : UserSchema = {
		display_name: 'root',
		email: 'root@email.com',
		password: password_hash,
		projects: [],
		tasks: [],
	};
	const user = new User( user_data );

	await user.save();
} );

afterAll( async () => {
	await db.close();
} );

beforeEach( async () => {
	// Delete all users before test
	await User.deleteMany( {} );

	const password_hash = await bcrypt.hash( 'password', 10 );
	const user_data : UserSchema = {
		display_name: 'root',
		email: 'root@email.com',
		password: password_hash,
		projects: [],
		tasks: [],
	};
	const user = new User( user_data );

	await user.save();
} );
describe( 'Testing GET routes', () => {
	test( 'Correct user is returned when getting user by ID', async () => {
		const user_to_find = await helpers.get_target_user();

		const result_user = await api
			.get( `/api/users/id/${user_to_find.id}` )
			.expect( 200 )
			.expect( 'Content-Type', /application\/json/ );

		const processed_user_to_view = JSON.parse( JSON.stringify( user_to_find ) );
		expect( result_user.body ).toEqual( processed_user_to_view );
	} );

	test( 'Correct user is returned when getting user by email', async () => {
		const user_to_find = await helpers.get_target_user();
		const result_user = await api
			.get( `/api/users/email/${user_to_find.email}` )
			.expect( 200 )
			.expect( 'Content-type', /application\/json/ );

		const processed_user_to_view = JSON.parse( JSON.stringify( user_to_find ) );

		expect( result_user.body ).toEqual( processed_user_to_view );
	} );

	test( '400 error is thrown when invalid email is supplied', async () => {
		const invalid_email = 'invalid email';

		const result = await api
			.get( `/api/users/email/${invalid_email}` )
			.expect( 400 )
			.expect( 'Content-type', /application\/json/ );

		expect( result.body.error ).toContain( 'Invalid email supplied' );
	} );

	test( '404 error is thrown when user is not found by id', async () => {
		const user = await helpers.get_target_user();
		const real_id = user.id;
		const fake_id = helpers.generate_fake_id( real_id );

		const result = await api
			.get( `/api/users/id/${fake_id}` )
			.expect( 404 )
			.expect( 'Content-type', /application\/json/ );

		expect( result.body.error ).toContain( 'User not found' );
	} );

	test( '404 error is thrown when user is not found by email', async () => {
		const fake_email = 'notreal@email.com';
		const result = await api
			.get( `/api/users/email/${fake_email}` )
			.expect( 404 )
			.expect( 'Content-type', /application\/json/ );

		expect( result.body.error ).toContain( 'User not found' );
	} );
} );

afterAll( () => {
	mongoose.connection.close();
} );
