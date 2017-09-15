// @flow
import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import RenderField from '../../../../../components/forms/RenderField/';

const LoginForm = props => {
  const { handleSubmit, pristine, handleOnSubmit, error } = props;
  return (
    <View>
      <Field name="email" label="Email" component={RenderField} />
      <Field name="password" label="Password" component={RenderField} />
      {error}
      <Button title="Login" onPress={handleSubmit(handleOnSubmit)} />
    </View>
  )
}

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Please enter your email';
  }
  if (!values.password) {
    errors.email = 'Please enter your password';
  }
  return errors;
}

export default reduxForm({
  form: 'login',
  validate
})(LoginForm)
