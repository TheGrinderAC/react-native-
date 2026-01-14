import React from 'react';
import { View, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
  },
  ratingContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  ratingText: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
  },
  content: {
    flex: 1,
  },
  username: {
    fontWeight: theme.fontWeights.bold,
    marginBottom: 4,
  },
  date: {
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.username}>{review.user.username}</Text>
        <Text style={styles.date}>
          {format(new Date(review.createdAt), 'dd.MM.yyyy')}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
