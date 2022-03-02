import express from 'express';
import { AuthController } from '../controllers/AuthController';

export const auth_router = express.Router();

auth_router.post( '/login', AuthController.login );

auth_router.post( '/register' );
