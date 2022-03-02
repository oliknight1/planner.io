import express from 'express';
import { param } from 'express-validator';
import { UserController } from '../controllers/UserController';

export const user_router = express.Router();

user_router.get( '/id/:id', UserController.get_by_id );

user_router.get( '/email/:email', param( 'email' ).isEmail().normalizeEmail(), UserController.get_by_email );
