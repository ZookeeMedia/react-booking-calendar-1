// @flow

import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import SignupForm from './components/SignupForm/';
import * as actions from '../../../actions/'

@connect((state) => ({ error: state.auth.error }), actions)
class Login extends Component {
  constructor(props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit({ email, password, first_name, last_name, phone }) {
    this.props.signupUser(email, password, first_name, last_name, phone,
      () => this.props.navigation.navigate('availabilityCalendar'));
  }

  render() {
    const { error } = this.props;
    return (
      <View>
        <Text>
          Login
        </Text>
        <SignupForm error={error} handleOnSubmit={this.handleOnSubmit} />
      </View>
    )
  }
}

export default Login;
