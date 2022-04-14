import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';

export const useCachedProject = () => {
	const params = useParams();
	const query_client = useQueryClient();
	return query_client.getQueryData( [ 'single_project', { id: params.id } ] );
};
