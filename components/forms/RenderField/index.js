// @flow
import React from 'react';
import { Text, View, TextInput } from 'react-native';

export default function RenderField(props) {
  const { input, label, meta: { touched, error } } = props;
  return (
    <View>
      <Text>{label}</Text>
      <TextInput {...input} placeholder={label} autoCapitalize='none' />
      {touched &&
        ((error &&
          <Text>{error}</Text>) )}
    </View>
  )
}
