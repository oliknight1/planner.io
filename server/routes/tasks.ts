import express from 'express';
import { TaskController } from '../controllers/TaskController';

export const task_router = express.Router();

task_router.get( '/id/:id', TaskController.get_by_id );

task_router.delete( '/id/:id', TaskController.remove );
