import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import Text from './Text';
import { CREATE_USER } from '../graphql/mutations';
import useSignIn from '../hooks/useSignIn';

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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  errorInput: {
    borderColor: 'red',
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters'),
  passwordConfirmation: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const FormikTextInput = ({ name, ...props }) => {
  const { setFieldValue, setFieldTouched, values, errors, touched } =
    props.formik;
  const showError = touched[name] && errors[name];

  return (
    <>
      <TextInput
        style={[styles.input, showError && styles.errorInput]}
        onChangeText={(value) => setFieldValue(name, value)}
        onBlur={() => setFieldTouched(name)}
        value={values[name]}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  );
};

export const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          username: '',
          password: '',
          passwordConfirmation: '',
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <View>
            <FormikTextInput
              name="username"
              placeholder="Username"
              formik={formik}
            />
            <FormikTextInput
              name="password"
              placeholder="Password"
              secureTextEntry
              formik={formik}
            />
            <FormikTextInput
              name="passwordConfirmation"
              placeholder="Password confirmation"
              secureTextEntry
              formik={formik}
            />
            <Button onPress={formik.handleSubmit} title="Sign up" />
          </View>
        )}
      </Formik>
    </View>
  );
};

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      // First, create the user
      await createUser({
        variables: {
          user: {
            username,
            password,
          },
        },
      });

      // Then sign in the newly created user
      const { data } = await signIn({ username, password });

      // Redirect to home page after successful sign-up and sign-in
      if (data?.authenticate) {
        navigate('/');
      }
    } catch (e) {
      console.log('Error during sign up:', e);
    }
  };

  return <SignUpForm onSubmit={onSubmit} />;
};

export default SignUp;
