// @flow

import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import _ from 'lodash';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actions from '../../../actions';

@connect(state => ({ bookingsDays: state.bookings.bookings }), actions)
class BookingsOverviewUser extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Bookings',
    tabBarIcon: ({ tintColor }) => <Icon name="format-list-bulleted" type="material-community" color={tintColor} size={30} />,
});

  componentWillMount() {
    this.props.getBookingsUser();
  }

  renderBookings(bookings) {
    return bookings.map(booking => {
      const year = new Date(booking.day).getFullYear();
      const month = new Date(booking.day).getMonth();
      const day = new Date(booking.day).getDate();
      const start = new Date(year, month, day, 0, booking.block * 15);
      const end = new Date(year, month, day, 0, 15 + booking.block * 15);

      return (
        <TouchableOpacity key={booking.id} onPress={() => this.props.navigation.navigate('showBookingAdmin', { booking })}>
          <View style={styles.bookingStyle}>
            <Text style={{ textAlign: 'center' }}>
              {moment(start).format('hh:mm a')} - {moment(end).format('hh:mm a')}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  }


  renderBookingsDays() {
    const { bookingsDays } = this.props;
    return _.map(bookingsDays, bookings => {
      const date = moment(new Date(bookings[0].day)).format('MMMM Do YYYY');
         return (
           <View key={date} style={{  }}>
             <Text style={styles.dateStyle}>{date}</Text>
             {this.renderBookings(bookings)}
           </View>
       )
    });
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        {this.renderBookingsDays()}
      </ScrollView>
    )
  }
}

const styles = {
  bookingStyle: {
    backgroundColor: '#ddd',
    paddingVertical: 10,
    position: 'relative'
  },
  dateStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10
  },
};

export default BookingsOverviewUser;
