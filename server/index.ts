import * as http from 'http';
import { app } from './app';

const server : http.Server = http.createServer( app );
server.listen( '3003', () => {
	// eslint-disable-next-line no-console
	console.log( 'server running on 3003' );
} );
