// @flow

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth_reducer';
import availability from './availability_reducer';
import bookings from './bookings_reducer';

export default combineReducers({
  form: formReducer,
  auth,
  availability,
  bookings,
});
