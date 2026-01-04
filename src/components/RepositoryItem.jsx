import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  headerTextContainer: {
    flex: 1,
  },
  description: {
    marginBottom: 10,
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 3,
    alignSelf: 'flex-start',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
});

const formatNumber = (num) => {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num;
};

const RepositoryItemHeader = ({ item }) => (
  <View style={styles.headerContainer}>
    <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
    <View style={styles.headerTextContainer}>
      <Text fontSize="heading" fontWeight="bold">
        {item.fullName}
      </Text>
      <Text color="textSecondary" style={styles.description}>
        {item.description}
      </Text>
      <Text style={styles.language}>{item.language}</Text>
    </View>
  </View>
);

const RepositoryStats = ({ item }) => (
  <View style={styles.statsContainer}>
    <View style={styles.stat}>
      <Text fontWeight="bold">{formatNumber(item.stargazersCount)}</Text>
      <Text color="textSecondary">Stars</Text>
    </View>
    <View style={styles.stat}>
      <Text fontWeight="bold">{formatNumber(item.forksCount)}</Text>
      <Text color="textSecondary">Forks</Text>
    </View>
    <View style={styles.stat}>
      <Text fontWeight="bold">{item.reviewCount}</Text>
      <Text color="textSecondary">Reviews</Text>
    </View>
    <View style={styles.stat}>
      <Text fontWeight="bold">{item.ratingAverage}</Text>
      <Text color="textSecondary">Rating</Text>
    </View>
  </View>
);

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <RepositoryItemHeader item={item} />
      <RepositoryStats item={item} />
    </View>
  );
};

export default RepositoryItem;
