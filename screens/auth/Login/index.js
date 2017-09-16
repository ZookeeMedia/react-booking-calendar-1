// @flow

import React, { Component } from 'react';
import { View, Text, Button, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import LoginForm from './components/LoginForm/';
import * as actions from '../../../actions/'

@connect((state) => ({ error: state.auth.error }), actions)
class Login extends Component {
  constructor(props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  async componentWillMount() {
    let token = await AsyncStorage.getItem('token');
    if (token) {
      this.props.navigation.navigate('main')
    }
  }

  handleOnSubmit({ email, password }) {
    this.props.loginUser(email, password, () => this.props.navigation.navigate('main'));
  }

  render() {
    const { error } = this.props;
    return (
      <View>
        <Text>
          Login
        </Text>
        <LoginForm error={error} handleOnSubmit={this.handleOnSubmit} />
        <Button title="Signup" onPress={() => this.props.navigation.navigate('signup')} />
      </View>
    )
  }
}

export default Login;
