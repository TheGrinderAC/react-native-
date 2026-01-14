import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';

const useMyReviews = () => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.me?.reviews?.pageInfo?.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.me.reviews.pageInfo.endCursor,
        includeReviews: true,
      },
    });
  };

  return {
    reviews: data?.me?.reviews,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useMyReviews;
