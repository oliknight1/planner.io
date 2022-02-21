import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

interface ErrorType {
	[key: string]: string[]
}

export const user_validation_rules = () => [
	body( 'email' ).not().isEmpty().withMessage( 'Email cannot be empty' )
		.isEmail()
		.withMessage( 'Invalid email' ),
	body( 'display_name' ).not().isEmpty().withMessage( 'Display name cannot be empty' )
		.trim()
		.escape(),
];

export const validate = ( request : Request, response : Response, next : NextFunction ) => {
	const errors = validationResult( request );
	if ( errors.isEmpty() ) {
		// Continue with the middleware stack
		return next();
	}

	const initial : ErrorType = {};

	// Create an object using previous iteratons object ( acc )
	// Then create new key value pair
	// if the key already has data attached to it, use spread to add that data in
	// attach current errors msg
	const processed_errors = errors.array().reduce( ( acc, error ) => {
		const { param, msg } = error;
		return { ...acc, [param]: [ ...( acc[param] || [] ), msg ] };
	}, initial );

	return response.status( 400 ).json( { error: processed_errors } );
};
