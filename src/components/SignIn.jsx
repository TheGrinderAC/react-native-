import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';
import Text from './Text';
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
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
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

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: '', password: '' }}
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
            <Button onPress={formik.handleSubmit} title="Sign in" />
          </View>
        )}
      </Formik>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(username, password);

      // Redirect to home page after successful sign-in
      if (data?.authenticate) {
        navigate('/');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
