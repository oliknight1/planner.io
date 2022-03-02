import express from 'express';
import { TaskController } from '../controllers/TaskController';

export const task_router = express.Router();

task_router.get( '/id/:id', TaskController.get_task );

task_router.delete( '/id/:id', TaskController.remove_task );

task_router.post( '/', TaskController.create );

task_router.patch( '/id/:id', TaskController.update );
