// @flow

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Linking, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import communications from 'react-native-communications';
import moment from 'moment';
import * as actions from '../../../actions/'

@connect(null, actions)
class ShowBookingAdmin extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: moment(navigation.state.params.booking.day).format('MMMM Do YYYY'),
    tabBarIcon: ({ tintColor }) => <Icon name="format-list-bulleted" type="material-community" color={tintColor} size={30} />,

  })

  render() {
    const { booking } = this.props.navigation.state.params;
    const { email, first_name, last_name, phone } = booking
    const year = new Date(booking.day).getFullYear();
    const month = new Date(booking.day).getMonth();
    const day = new Date(booking.day).getDate();
    const start = new Date(year, month, day, 0, booking.block * 15);
    const end = new Date(year, month, day, 0, 15 + booking.block * 15);

    return (
      <View style={{ flex: 1, backgroundColor: '#f9f9f9', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, lineHeight: 40 }}>{first_name} {last_name}</Text>
        <Text>{phone}</Text>
        <Text>{email}</Text>
        <Text style={{ fontWeight: 'bold', lineHeight: 40 }}>{moment(start).format('hh:mm a')} - {moment(end).format('hh:mm a')}</Text>

        <Button title="Call" onPress={() => communications.phonecall(phone)} />
        <Button
          title="Email"
          onPress={() => communications.email(email, null, null, `Booking for ${moment(this.props.navigation.state.params.booking.day).format('MMMM Do YYYY')}`)}
        />
        <Button
          title="Cancel Booking"
          color="#ff0000"
          onPress={() => {this.props.deleteBooking(booking.id, () => {this.props.getBookingsUser(); this.props.navigation.navigate('bookingsOverviewAdmin'); this.props.getAvailability()});}}
        />
      </View>
    )
  }
}

export default ShowBookingAdmin;
