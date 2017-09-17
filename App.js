// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';
import store from './store';
import Login from './screens/auth/Login/';
import Signup from './screens/auth/Signup/';
import AvailabilityCalendar from './screens/availability/AvailabilityCalendar/';
import SelectTimes from './screens/availability/SelectTimes/';
import BookingsOverviewUser from './screens/bookings/BookingsOverviewUser/';

export default class App extends React.Component {
  render() {
    const MainNavigator = new TabNavigator({
      auth: { screen: new StackNavigator({
        login: { screen: Login },
        signup: { screen: Signup },
      }) },
      main: { screen: new TabNavigator({
        availability: { screen: new StackNavigator({
          availabilityCalendar: { screen: AvailabilityCalendar },
          selectTimes: { screen: SelectTimes },
        }) },
        bookings: { screen: new StackNavigator({
          bookingsUser: { screen: BookingsOverviewUser }
        }) }
      }, { tabBarOptions: { showLabel: false } }),

    },
    }, { navigationOptions: { tabBarVisible: false }
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
