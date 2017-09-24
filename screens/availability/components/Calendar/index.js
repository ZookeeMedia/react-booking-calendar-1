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
    const { daysInMonth, admin, availabilityBlocks, firstDayOfMonth } = this.props;
    return daysInMonth.map((day, i) => (
      <View style={styles.dayContainer(day + 1, this.props.firstDayOfMonth)} key={day}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate(admin ? 'selectTimesAdmin': availabilityBlocks[day + 1] ? 'selectTimesUser' : null,
          { year: this.props.year, month: this.props.month - 1, day: day + 1, availabilityBlocks: availabilityBlocks[day + 1] })}>
          <View style={styles.days(day + 1, firstDayOfMonth, availabilityBlocks)}>
            <Text>{day + 1}</Text>
          </View>
        </TouchableOpacity>
      </View>
    ))
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
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
  dayContainer: (day, firstDayOfMonth) => ({
    height: SCREEN_WIDTH/7.1,
    width: SCREEN_WIDTH/7.1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    marginLeft: day === 1 ? firstDayOfMonth * SCREEN_WIDTH/7.1 : 0
  }),
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
    backgroundColor: availableDays[day] ? '#7ae899' : '#ddd',
    borderRadius: SCREEN_WIDTH/7.7/2,
    width:SCREEN_WIDTH/7.7,
    height:SCREEN_WIDTH/7.7,
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
  })
}

export default Calendar;
