import express from 'express';
import { body } from 'express-validator';
import { ProjectController } from '../controllers/ProjectController';

export const project_router = express.Router();

project_router.get( '/id/:id', ProjectController.get_by_id );

project_router.post( '/', ProjectController.create );

project_router.patch( '/id/:id', body( 'project' ).notEmpty().withMessage( 'Must provide project data' ), ProjectController.update );

project_router.delete( '/' );
