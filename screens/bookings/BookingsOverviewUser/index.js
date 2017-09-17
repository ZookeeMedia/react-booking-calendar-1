// @flow

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
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
    // this.onPressBoo = this.onPressBlock.bind(this);
  }

  state = { selectedBookings: [] };

  componentWillMount() {
    this.props.getBookings();
  }

  // onPressBlock(block) {
  //   if (this.state.selectedBlocks.indexOf(block) === -1) {
  //     this.setState(prevState => ({ selectedBlocks: [ ...this.state.selectedBlocks, block ] }))
  //   } else {
  //     this.setState(prevState => ({ selectedBlocks: this.state.selectedBlocks.filter(current => current !== block) }))
  //   }
  // }
  renderBookings(bookings) {
    return bookings.map(booking => {
      const year = new Date(booking.day).getFullYear();
      const month = new Date(booking.day).getMonth();
      const day = new Date(booking.day).getDate();
      const start = new Date(year, month, day, 0, booking.block * 15);
      const end = new Date(year, month, day, 0, 15 + booking.block * 15);

      return (
        <TouchableOpacity key={booking.id} onPress={() => console.log(booking.id)}>
          <View style={styles.bookingStyle(booking.id, this.state.selectedBookings)}>
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
      const date = moment(new Date(bookings[0].day)).format('l');
         return (
           <View key={date} style={{  }}>
             <Text>{date}</Text>
             {this.renderBookings(bookings)}
           </View>
       )
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderBookingsDays()}
      </View>
    )
  }
}

const styles = {
  bookingStyle: (block, selectedBookings) => ({
    backgroundColor: selectedBookings.indexOf(block) > -1 ? '#7ae899' : '#ddd',
    paddingVertical: 10
  })
};

export default BookingsOverviewUser;
