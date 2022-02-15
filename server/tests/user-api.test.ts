import supertest from 'supertest';
import { app } from '../app';

const api = supertest( app );

test( 'user is returned as json', async () => {
	await api
		.get( '/api/users' )
		.expect( 200 )
		.expect( 'Content-type', /application\/json/ );
} );
