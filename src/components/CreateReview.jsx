import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import Text from './Text';
import { CREATE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  errorInput: {
    borderColor: 'red',
  },
  globalError: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },
});

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100')
    .integer('Rating must be an integer'),
  text: yup.string(),
});

const FormikTextInput = ({ name, multiline, ...props }) => {
  const { setFieldValue, setFieldTouched, values, errors, touched } =
    props.formik;
  const showError = touched[name] && errors[name];

  return (
    <>
      <TextInput
        style={[
          styles.input,
          multiline && styles.multilineInput,
          showError && styles.errorInput,
        ]}
        onChangeText={(value) => setFieldValue(name, value)}
        onBlur={() => setFieldTouched(name)}
        value={values[name]}
        multiline={multiline}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  );
};

export const CreateReviewForm = ({ onSubmit, error }) => {
  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.globalError} testID="apiError">
          {error}
        </Text>
      ) : null}
      <Formik
        initialValues={{
          ownerName: '',
          repositoryName: '',
          rating: '',
          text: '',
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <View>
            <FormikTextInput
              name="ownerName"
              placeholder="Repository owner name"
              formik={formik}
            />
            <FormikTextInput
              name="repositoryName"
              placeholder="Repository name"
              formik={formik}
            />
            <FormikTextInput
              name="rating"
              placeholder="Rating between 0 and 100"
              formik={formik}
              keyboardType="numeric"
            />
            <FormikTextInput
              name="text"
              placeholder="Review"
              formik={formik}
              multiline
            />
            <Button onPress={formik.handleSubmit} title="Create a review" />
          </View>
        )}
      </Formik>
    </View>
  );
};

const CreateReview = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onSubmit = async (values, { setSubmitting }) => {
    const { ownerName, repositoryName, rating, text } = values;

    setError(null);

    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: Number(rating),
            text,
          },
        },
      });

      if (data?.createReview) {
        const repositoryId = data.createReview.repositoryId;
        navigate(`/repositories/${repositoryId}`);
      }
    } catch (e) {
      // Show user friendly error
      let errorMessage =
        e?.graphQLErrors?.[0]?.message ||
        e?.message ||
        'Error creating review, please try again.';
      setError(errorMessage);
    } finally {
      if (typeof setSubmitting === 'function') setSubmitting(false);
    }
  };

  return <CreateReviewForm onSubmit={onSubmit} error={error} />;
};

export default CreateReview;
