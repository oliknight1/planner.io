import * as http from 'http';
import { app } from './app';
import { PORT } from './utils/config';

const server : http.Server = http.createServer( app );
server.listen( PORT || 3003, () => {
	// eslint-disable-next-line no-console
	console.log( `server running on ${PORT}` );
} );
