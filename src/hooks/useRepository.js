import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id, variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
    variables: {
      id,
      first: 3, // Small number for testing infinite scroll
      ...variables,
    },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        id,
        ...variables,
      },
    });
  };

  const repository = data?.repository;
  const reviews = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return {
    repository,
    reviews,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepository;
