// @flow
import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import RenderField from '../../../../../components/forms/RenderField/';
import RenderPasswordField from '../../../../../components/forms/RenderPasswordField/';

const Signupform = props => {
  const { handleSubmit, pristine, handleOnSubmit, error } = props;
  return (
    <View>
      <Field name="email" label="Email" component={RenderField} />
      <Field name="password" label="Password" component={RenderPasswordField} />
      <Field name="phone" label="Phone" component={RenderField} />
      <Field name="first_name" label="First Name" component={RenderField} />
      <Field name="last_name" label="Last Name" component={RenderField} />
      {error}
      <Button title="Signup" onPress={handleSubmit(handleOnSubmit)} />
    </View>
  )
}

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Please enter your email';
  }
  if (!values.password) {
    errors.password = 'Please enter your password';
  }
  return errors;
}

export default reduxForm({
  form: 'login',
  validate
})(Signupform)
