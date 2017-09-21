// @flow

import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import EditUserProfileForm from './components/EditUserProfileForm/';
import * as actions from '../../../actions/'

@connect((state) => ({ error: state.account.updateError }), actions)
class EditUserProfile extends Component {
  static navigationOptions = {
    title: 'Edit Details'
  }
  constructor(props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit({ email, first_name, last_name, phone }) {
    const resetAction = NavigationActions.back();

    this.props.updateUserProfile(email, first_name, last_name, phone,
      this.props.navigation.dispatch(resetAction));
  }

  render() {

    const { error } = this.props;
    return (
      <View>
        <EditUserProfileForm
          initialValues={this.props.navigation.state.params.initialValues}
          error={error}
          handleOnSubmit={this.handleOnSubmit}
        />
      </View>
    )
  }
}

export default EditUserProfile;
