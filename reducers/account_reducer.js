import { ACCOUNT_FETCH_PROFILE, ACCOUNT_FETCH_PROFILE_ERROR } from '../actions/types';

const INITIAL_STATE = {
  profile: {},
  error: ''
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ACCOUNT_FETCH_PROFILE:
      return { profile: action.payload, error: '' };
    case ACCOUNT_FETCH_PROFILE_ERROR:
      return { ...state, error: action.payload }
    default:
      return state;
  }
}
