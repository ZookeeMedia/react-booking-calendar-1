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

  constructor(props) {
    super(props);
    this.onPressBooking = this.onPressBooking.bind(this);
  }

  state = { selectedBookings: [] };

  componentWillMount() {
    this.props.getBookingsUser();
  }

  onPressBooking(block) {
    const { selectedBookings } = this.state;
    if (selectedBookings.indexOf(block) === -1) {
      this.setState(prevState => ({ selectedBookings: [ ...selectedBookings, block ] }))
    } else {
      this.setState(prevState => ({ selectedBookings: selectedBookings.filter(current => current !== block) }))
    }
  }

  renderBookings(bookings) {
    return bookings.map(booking => {
      const year = new Date(booking.day).getFullYear();
      const month = new Date(booking.day).getMonth();
      const day = new Date(booking.day).getDate();
      const start = new Date(year, month, day, 0, booking.block * 15);
      const end = new Date(year, month, day, 0, 15 + booking.block * 15);

      return (
        <TouchableOpacity key={booking.id} onPress={() => this.onPressBooking(booking.id)}>
          <View style={styles.bookingStyle(booking.id, this.state.selectedBookings)}>
            <Text style={{ textAlign: 'center' }}>
              {moment(start).format('hh:mm a')} - {moment(end).format('hh:mm a')}
            </Text>
            <Icon
              containerStyle={{ position: 'absolute', right: 5, top: 7 }}
              name='close'
              type='material-community'
              onPress={() => {this.props.deleteBooking(booking.id, () => {this.props.getBookingsUser(); this.props.getAvailability()});}}
            />
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
      <ScrollView style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
        {this.renderBookingsDays()}
      </ScrollView>
    )
  }
}

const styles = {
  bookingStyle: (block, selectedBookings) => ({
    backgroundColor: selectedBookings.indexOf(block) > -1 ? '#999' : '#ddd',
    paddingVertical: 10,
    position: 'relative'
  }),
  dateStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10
  },
};

export default BookingsOverviewUser;
