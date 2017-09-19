// @flow
import { BOOKING_MADE, BOOKING_ERROR, BOOKINGS_FETCH, BOOKINGS_FETCH_ERROR } from '../actions/types';
import _ from 'lodash';

const INITIAL_STATE = {
  bookings: [],
}

const reduceBookings = (bookings) => {
  return bookings.reduce((accumulator, booking) => {
    if (accumulator[booking.day] === undefined) {
      accumulator[booking.day] = [];
    }
    accumulator[booking.day].push(booking);
    // accumulator[booking.day].sort((a, b) => a.block - b.block);
    return accumulator;
  }, {});
}

export default function(state = INITIAL_STATE, action) {

  switch(action.type) {
    case BOOKINGS_FETCH:
      return {
        ...state,
        bookings: reduceBookings(action.payload.results),
        error: '',
      };
    case BOOKINGS_FETCH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
