// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';
import store from './store';
import Login from './screens/auth/Login/';
import Signup from './screens/auth/Signup/';
import AvailabilityCalendarUser from './screens/availability/AvailabilityCalendarUser/';
import SelectTimesUser from './screens/availability/SelectTimesUser/';
import BookingsOverviewUser from './screens/bookings/BookingsOverviewUser/';
import AvailabilityCalendarAdmin from './screens/availability/AvailabilityCalendarAdmin/';
import SelectTimesAdmin from './screens/availability/SelectTimesAdmin/';
import BookingsOverviewAdmin from './screens/bookings/BookingsOverviewAdmin/';
import ShowBookingAdmin from './screens/bookings/ShowBookingAdmin/';

export default class App extends React.Component {
  render() {
    const MainNavigator = new TabNavigator({
      auth: { screen: new StackNavigator({
        login: { screen: Login },
        signup: { screen: Signup },
      }) },
      user: { screen: new TabNavigator({
        availabilityUser: { screen: new StackNavigator({
          availabilityCalendarUser: { screen: AvailabilityCalendarUser },
          selectTimesUser: { screen: SelectTimesUser },
        }) },
        bookingsUser: { screen: new StackNavigator({
          bookingsOverviewUser: { screen: BookingsOverviewUser }
        }) }
      }, { tabBarOptions: { showLabel: false } }),

    },
    admin: { screen: new TabNavigator({
      availabilityAdmin: { screen: new StackNavigator({
        availabilityCalendarAdmin: { screen: AvailabilityCalendarAdmin },
        selectTimesAdmin: { screen: SelectTimesAdmin },
      }) },
      bookingsAdmin: { screen: new StackNavigator({
        bookingsOverviewAdmin: { screen: BookingsOverviewAdmin },
        showBookingAdmin: { screen: ShowBookingAdmin },
      }) }
    }, { tabBarOptions: { showLabel: false } }),

  },
}, { lazy: true, navigationOptions: { tabBarVisible: false }
  })

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
