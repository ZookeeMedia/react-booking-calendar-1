// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { Constants } from 'expo';
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
import UserProfile from './screens/account/UserProfile/';
import EditUserProfile from './screens/account/EditUserProfile/';

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
        }) },
        account: { screen: new StackNavigator({
          userProfile: { screen: UserProfile },
          editUserProfile: { screen: EditUserProfile }
        }) }
      }, { tabBarPosition: 'bottom', backBehavior: 'none', tabBarOptions: { showLabel: true } }),

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
    }, { tabBarPosition: 'bottom', tabBarOptions: { showLabel: false, showIcon: true } }),

  },
}, {  lazy: true, swipeEnabled: false, backBehavior: 'none', navigationOptions: { tabBarVisible: false }
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
    marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
    flex: 1,
    backgroundColor: '#fff'
  },
});
