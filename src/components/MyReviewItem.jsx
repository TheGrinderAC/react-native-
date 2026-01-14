import React from 'react';
import { View, StyleSheet, Pressable, Alert } from 'react-native';
import { format } from 'date-fns';
import { useMutation } from '@apollo/client';
import Text from './Text';
import theme from '../theme';
import { DELETE_REVIEW } from '../graphql/mutations';
import { GET_ME } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  reviewContent: {
    flexDirection: 'row',
    padding: 15,
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
  repositoryName: {
    fontWeight: theme.fontWeights.bold,
    marginBottom: 4,
  },
  date: {
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    padding: 15,
    paddingTop: 0,
    gap: 15,
  },
  button: {
    flex: 1,
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  },
  buttonText: {
    color: 'white',
    fontWeight: theme.fontWeights.bold,
  },
});

const MyReviewItem = ({ review, onViewRepository }) => {
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    refetchQueries: [{ query: GET_ME, variables: { includeReviews: true } }],
  });

  const handleDelete = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteReview({
                variables: { id: review.id },
              });
            } catch (error) {
              console.error('Error deleting review:', error);
              Alert.alert('Error', 'Failed to delete review');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.reviewContent}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.repositoryName}>{review.repository.fullName}</Text>
          <Text style={styles.date}>
            {format(new Date(review.createdAt), 'dd.MM.yyyy')}
          </Text>
          <Text>{review.text}</Text>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <Pressable
          style={[styles.button, styles.viewButton]}
          onPress={onViewRepository}
        >
          <Text style={styles.buttonText}>View repository</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MyReviewItem;
