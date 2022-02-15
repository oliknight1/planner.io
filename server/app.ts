import express from 'express';
import cors from 'cors';

export const app = express();

app.use( cors() );
app.use( express.json() );

// mongoose.connect( config.MONGODB_URI as string )
//   .then( () => {
//     console.log( 'Connected to MongoDB database' );
//   } )
//   .catch( ( error : Error ) => {
//     console.error( 'Error connecting to MongoDB', error );
//   } );
//
