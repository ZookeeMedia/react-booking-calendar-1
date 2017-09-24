// @flow
import React from 'react';
import { Text, View, TextInput } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

export default function RenderField(props) {
  const { input, label, meta: { touched, error } } = props;
  return (
    <View>
      <FormLabel>{label}</FormLabel>
      <FormInput {...input} placeholder={label} autoCapitalize='none' secureTextEntry />
      {touched &&
        ((error &&
          <FormValidationMessage>{error}</FormValidationMessage>) )}
    </View>
  )
}
