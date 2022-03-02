import supertest from 'supertest';
import bcrypt from 'bcrypt';
import { app } from '../app';
import { User } from '../models/user';
import { UserSchema } from '../utils/types';
import * as db from './helpers/test_db_helper';
import * as helpers from './helpers/test_helper';

const api = supertest( app );

beforeAll( async () => {
	await db.connect();
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
describe( 'Test logging in', () => {
	test( 'Successfull login', async () => {
		const login_details = {
			email: 'root@email.com',
			password: 'password',
		};
		const response = await api
			.post( '/api/auth/login' )
			.send( login_details )
			.expect( 200 );

		expect( response.body ).toEqual( expect.objectContaining( {
			token: expect.any( String ),
			display_name: 'root',
			id: ( await helpers.get_target_user() ).id,
		} ) );
	} );

	test( 'Login fails with wrong email', async () => {
		const login_details = {
			email: 'notroot@email.com',
			password: 'password',
		};

		const response = await api
			.post( '/api/auth/login' )
			.expect( 401 )
			.send( login_details )
			.expect( 'Content-type', /application\/json/ );

		expect( response.body.error ).toContain( 'Invalid email or password' );
	} );

	test( 'Login fails with wrong password', async () => {
		const login_details = {
			email: 'root@email.com',
			password: 'wrongpassword',
		};

		const response = await api
			.post( '/api/auth/login' )
			.expect( 401 )
			.send( login_details )
			.expect( 'Content-type', /application\/json/ );

		expect( response.body.error ).toContain( 'Invalid email or password' );
	} );
} );

describe( 'Test registering new user', () => {
	test( 'Successfull register', async () => {
		const users_pre_test = await helpers.users_in_db();
		const user_details : UserSchema = {
			display_name: 'new user',
			email: 'newuser@email.com',
			password: 'password',
		};

		await api
			.post( '/api/auth/register' )
			.send( user_details )
			.expect( 201 );

		const users_post_test = await helpers.users_in_db();
		expect( users_post_test.length ).toEqual( users_pre_test.length + 1 );
	} );
	test( 'Register fails if email is in use', async () => {
		const users_pre_test = await helpers.users_in_db();
		const user_details : UserSchema = {
			display_name: 'new user',
			email: 'root@email.com',
			password: 'password',
		};

		const response = await api
			.post( '/api/auth/register' )
			.send( user_details )
			.expect( 400 );

		const users_post_test = await helpers.users_in_db();
		expect( users_post_test.length ).toEqual( users_pre_test.length );

		expect( response.body.error ).toContain( 'A user is already registered with this email' );
	} );
} );
