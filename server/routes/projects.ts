import express from 'express';
import { ProjectController } from '../controllers/ProjectController';

export const project_router = express.Router();

project_router.get( '/id/:id', ProjectController.get_by_id );

project_router.post( '/' );

project_router.patch( '/' );
