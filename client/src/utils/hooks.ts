import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { Project } from './types';

export const useCachedProject = () => {
	const params = useParams();
	const query_client = useQueryClient();
	return query_client.getQueryData<Project>( [ 'single_project', { id: params.id } ] );
};
