import React, { Component } from 'react';
import { ScrollView, View, Text, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

@connect(state => ({ profile: state.account.profile, error: state.account.error }), actions)
export default class UserProfile extends Component {

  static navigationOptions = ({ navigation }) => {

    const { params } = navigation.state;
    return { title: 'Account Details',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" type="material-community" color={tintColor} size={30} />,
      headerRight: params !== undefined && params.onPressLogoutButton !== undefined ? <Button title="Logout" onPress={params.onPressLogoutButton} /> : null
    }
  }

  constructor(props) {
    super(props);

    this.onPressLogoutButton = this.onPressLogoutButton.bind(this);
  }

  componentWillMount() {
    this.props.getUserProfile();
    this.props.navigation.setParams({ onPressLogoutButton: this.onPressLogoutButton })
  }

  onPressLogoutButton() {
    this.props.logoutUser(this.props.navigation.navigate);
  }

  render() {
    const { first_name, last_name, phone, email } = this.props.profile;
    if (!this.props.profile) {
      return null;
    }
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
        <View style={{ flex: 1, backgroundColor: '#f9f9f9', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, lineHeight: 40 }}>{first_name} {last_name}</Text>
          <Text>{phone}</Text>
          <Text>{email}</Text>
          <Button title="Edit" onPress={() => this.props.navigation.navigate('editUserProfile', { initialValues: this.props.profile })} />
        </View>
      </ScrollView>
    )
  }
}
