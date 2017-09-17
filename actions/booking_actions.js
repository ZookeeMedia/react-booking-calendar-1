// @flow
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { BOOKING_MADE, BOOKING_ERROR, BOOKINGS_FETCH, BOOKINGS_FETCH_ERROR } from './types';

const ROOT_URL = 'http://localhost:8080';

export function makeBooking(blockIds = [], callBack) {
  const request = `${ROOT_URL}/bookings`;
  return async (dispatch) => {
    let token = await AsyncStorage.getItem('token');
    axios.post(request, { blockIds }, { headers: { authorization: token }})
      .then(({ data }) => {
        dispatch({
          type: BOOKING_MADE,
          payload: data
        })
        if (callBack) {
          callBack()
        }
      }).catch(() => {
        dispatch({
          type: BOOKING_ERROR,
          payload: 'oops there was a problem making the booking, please try again'
        })
      })
  }
}

export function getBookings() {
  const request = `${ROOT_URL}/bookings`;
  return async (dispatch) => {
    let token = await AsyncStorage.getItem('token');
    axios.get(request, { headers: { authorization: token }})
      .then(({ data }) => {

        dispatch({
          type: BOOKINGS_FETCH,
          payload: data
        })
      }).catch(() => {
        dispatch({
          type: BOOKINGS_FETCH_ERROR,
          payload: 'oops there was a problem getting the bookings, please try again'
        })
      })
  }
}
