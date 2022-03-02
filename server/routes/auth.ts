import express from 'express';
import { AuthController } from '../controllers/AuthController';
import { user_validation_rules, validate } from '../utils/validator';

export const auth_router = express.Router();

auth_router.post( '/login', AuthController.login );

auth_router.post( '/register', user_validation_rules(), validate, AuthController.create );
