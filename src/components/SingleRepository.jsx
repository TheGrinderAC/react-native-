import React from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#eee',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, reviews, loading, fetchMore } = useRepository(id);

  const onEndReach = () => {
    fetchMore();
  };

  if (loading || !repository) {
    return <ActivityIndicator />;
  }

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <View>
          <RepositoryItem item={repository} showGitHubButton />
        </View>
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
