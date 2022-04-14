import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { ProjectController } from '../controllers/ProjectController';
import { Project } from './types';

export const useProject = () => {
	const params = useParams();
	return useQuery<Project, Error>( [ 'single_project', { id: params.id } ], () => ProjectController.get_by_id( params.id as string ) );
};
