// @flow

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import Calendar from '../components/Calendar/';
import * as actions from '../../../actions';

@connect(state => ({
  availabilityBlocks: state.availability.availabilityBlocks,
  daysInPrevMonth: state.availability.daysInMonth,
  daysInMonth: state.availability.daysInMonth,
  daysInNextMonth: state.availability.daysInMonth,
  month: state.availability.month,
  year: state.availability.year,
  firstDayOfMonth: state.availability.firstDayOfMonth,
  error: state.availability.error,
}), actions)
class AvailabilityCalendarUser extends Component {
  static navigationOptions = {
    title: 'AvailabilityAdmin',
    tabBarIcon: ({ tintColor }) => <Icon name="calendar" type="material-community" color={tintColor} size={30} />,
  }

  constructor(props) {
    super(props);

    this.fetchAvailability = this.fetchAvailability.bind(this);
  }
  state = {
    monthsFromNow: 0
  }

  componentWillMount() {
    this.props.getAvailability(this.state.monthsFromNow);
  }

  fetchAvailability(month) {
    const { monthsFromNow } = this.state;

    if (month === 'previous') {
      this.props.getAvailability(monthsFromNow -1);
      this.setState(prevState => ({ monthsFromNow: prevState.monthsFromNow - 1 }))
    } else if (month === 'next') {
      this.props.getAvailability(monthsFromNow +1);
      this.setState(prevState => ({ monthsFromNow: prevState.monthsFromNow + 1 }))
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Calendar
          admin
          fetchAvailability={this.fetchAvailability}
          firstDayOfMonth={this.props.firstDayOfMonth}
          month={this.props.month}
          year={this.props.year}
          daysInMonth={this.props.daysInMonth}
          availabilityBlocks={this.props.availabilityBlocks}
          navigation={this.props.navigation}
        />
      </View>
    )
  }
}

export default AvailabilityCalendarUser;
