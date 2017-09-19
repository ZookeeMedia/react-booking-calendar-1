// @flow
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import _ from 'lodash';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Calendar extends Component {

  renderColumnHeaders() {
    const days = [
      { name: 'sunday', short: 'S' },
      { name: 'monday', short: 'M' },
      { name: 'tuesday', short: 'T' },
      { name: 'wednesday', short: 'W' },
      { name: 'thursday', short: 'T' },
      { name: 'friday', short: 'F' },
      { name: 'saturday', short: 'S' }
    ]

    return days.map((day, i) => <View style={styles.columnHeader} key={day.name}><Text>{day.short}</Text></View>)
  }

  renderMonthName() {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    return months[this.props.month-1];
  }

  renderDays() {
    const { daysInMonth } = this.props;
    console.log(this.props.availabilityBlocks);
    return daysInMonth.map((day, i) => (
      <View style={styles.days(day + 1, this.props.firstDayOfMonth, this.props.availabilityBlocks)} key={day}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('selectTimesUser',
          { year: this.props.year, month: this.props.month - 1, day: day + 1, availabilityBlocks: this.props.availabilityBlocks[day + 1] })}>
          <Text>{day + 1}</Text>
        </TouchableOpacity>
      </View>
    ))
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#f9f9f9' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => this.props.fetchAvailability('previous')}>
            <Icon name='chevron-left' />
          </TouchableOpacity>
          <Text style={styles.monthName}>{this.renderMonthName()} {this.props.year}</Text>
          <TouchableOpacity onPress={() => this.props.fetchAvailability('next')} >
            <Icon name='chevron-right' />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
          {this.renderColumnHeaders()}
          {this.renderDays()}
        </View>
      </View>
    )
  }
}

const styles = {
  monthName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10
  },
  columnHeader: {
    width: SCREEN_WIDTH/7.1,
    justifyContent: 'center',
    alignItems: 'center',
    height: SCREEN_WIDTH/7.1
  },
  days: (day, firstDayOfMonth, availableDays) => ({
    width: SCREEN_WIDTH/7.1,
    justifyContent: 'center',
    alignItems: 'center',
    height: SCREEN_WIDTH/7.1,
    backgroundColor: availableDays[day] ? '#7ae899' : '#ddd',
    borderRadius: SCREEN_WIDTH/7.1/2,
    marginBottom: 5,
    marginLeft: day === 1 ? firstDayOfMonth * SCREEN_WIDTH/7.1 : 0
  })
}

export default Calendar;
