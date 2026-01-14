import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import Text from './Text';
import useMyReviews from '../hooks/useMyReviews';
import MyReviewItem from './MyReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviewsContainer = ({ reviews, onEndReach }) => {
  const navigate = useNavigate();
  const reviewNodes = reviews
    ? reviews.edges.map((edge) => edge.node)
    : [];

  const handleViewRepository = (repositoryId) => {
    navigate(`/repositories/${repositoryId}`);
  };

  if (reviewNodes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text fontSize="subheading" color="textSecondary">
          You haven't created any reviews yet
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => (
        <MyReviewItem
          review={item}
          onViewRepository={() => handleViewRepository(item.repository.id)}
        />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const MyReviews = () => {
  const { reviews, fetchMore } = useMyReviews();

  const onEndReach = () => {
    fetchMore();
  };

  return <MyReviewsContainer reviews={reviews} onEndReach={onEndReach} />;
};

export default MyReviews;
