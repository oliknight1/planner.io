import express, { Request, Response } from 'express';
import { body, param } from 'express-validator';
import { UserController } from '../controllers/UserController';
import { user_validation_rules, validate } from '../utils/validator';

export const user_router = express.Router();

user_router.post( '/', user_validation_rules(), validate, UserController.create );

user_router.get( '/id/:id', UserController.get_by_id );

user_router.get( '/email/:email', param( 'email' ).isEmail().normalizeEmail(), UserController.get_by_email );
