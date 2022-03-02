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

describe( 'Test user registration', () => {
	test( 'User creation succeeds and adds user to database', async () => {
		const users_pre_test = await helpers.users_in_db();

		const new_user : UserSchema = {
			display_name: 'oliknight',
			email: 'oli@email.com',
			password: 'password1',
			password_confirm: 'password1',
		};

		const response = await api
			.post( '/api/auth/register' )
			.send( new_user )
			.expect( 201 )
			.expect( 'Content-Type', /application\/json/ );

		const users_post_test = await helpers.users_in_db();
		expect( users_post_test ).toHaveLength( users_pre_test.length + 1 );

		const emails = users_post_test.map( ( user : UserSchema ) => user.email );
		expect( emails ).toContain( new_user.email );

		expect( response.body ).toEqual( expect.objectContaining( {
			token: expect.any( String ),
			display_name: 'oliknight',
			id: users_post_test[users_post_test.length - 1].id,
		} ) );
	} );

	test( 'User creation fails with correct status code when non-unique email', async () => {
		const users_pre_test = await helpers.users_in_db();

		const new_user : UserSchema = {
			display_name: 'oliknight',
			email: 'root@email.com',
			password: 'password1',
			password_confirm: 'password1',
		};

		const result = await api
			.post( '/api/auth/register' )
			.send( new_user )
			.expect( 400 )
			.expect( 'Content-Type', /application\/json/ );

		expect( result.body.error ).toContain( 'Account with that email already exists' );

		const users_post_test = await helpers.users_in_db();
		expect( users_post_test.length ).toEqual( users_pre_test.length );
	} );

	test( 'User creation fails with empty email/display_name', async () => {
		const users_pre_test = await helpers.users_in_db();

		const new_user : UserSchema = {
			display_name: '',
			email: '',
			password: 'password1',
			password_confirm: 'password1',
		};
		const result = await api
			.post( '/api/auth/register' )
			.send( new_user )
			.expect( 400 )
			.expect( 'Content-Type', /application\/json/ );

		expect( result.body.error.display_name ).toContain( 'Display name cannot be empty' );
		expect( result.body.error.email ).toContain( 'Email cannot be empty' );
		const users_post_test = await helpers.users_in_db();
		expect( users_pre_test.length ).toEqual( users_post_test.length );
	} );

	test( 'User creation fails if passwords do not match', async () => {
		const users_pre_test = await helpers.users_in_db();

		const new_user : UserSchema = {
			display_name: 'new users',
			email: 'newuser@email.com',
			password: 'password1',
			password_confirm: 'password2',
		};
		const result = await api
			.post( '/api/auth/register' )
			.send( new_user )
			.expect( 400 )
			.expect( 'Content-Type', /application\/json/ );

		expect( result.body.error ).toContain( 'Passwords do not match' );
		const users_post_test = await helpers.users_in_db();
		expect( users_pre_test.length ).toEqual( users_post_test.length );
	} );
} );
