import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import * as Linking from 'expo-linking';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  button: {
    marginTop: 15,
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
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

const RepositoryItem = ({ item, showGitHubButton = false }) => {
  return (
    <View style={styles.container} testID="repositoryItem">
      {/* existing header + stats */}
      <RepositoryItemHeader item={item} />
      <RepositoryStats item={item} />

      {showGitHubButton && (
        <Pressable
          style={styles.button}
          onPress={() => Linking.openURL(item.url)}
        >
          <Text style={styles.buttonText}>Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
