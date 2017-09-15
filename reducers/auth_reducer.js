// @flow

import { AUTH_USER, AUTH_ERROR, DEAUTH_USER } from '../actions/types';

const INITIAL_STATE = {
  autenticated: false,
  error: ''
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case AUTH_USER:
      return { authenticated: true, error: '' };
    case DEAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
