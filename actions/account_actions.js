import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { ACCOUNT_FETCH_PROFILE, ACCOUNT_FETCH_PROFILE_ERROR, ACCOUNT_UPDATE_PROFILE_ERROR } from './types';

const ROOT_URL = 'https://mysql-course-rplay.c9users.io';

export function getUserProfile() {
  return async (dispatch) => {
    let token = await AsyncStorage.getItem('token');

    axios.get(`${ROOT_URL}/profile`, { headers: { authorization: token } })
      .then(({data}) => {
        dispatch({
          type: ACCOUNT_FETCH_PROFILE,
          payload: data
        });
      })
      .catch(() => {
        dispatch({
          type: ACCOUNT_FETCH_PROFILE_ERROR,
          payload: 'Oops, something went wrong. Please try again.'
        });
      })
  }
}

export function updateUserProfile(email, first_name, last_name, phone, callBack) {
  return async (dispatch) => {
    let token = await AsyncStorage.getItem('token');

    axios.put(`${ROOT_URL}/profile`, { email, first_name, last_name, phone },
      { headers: { authorization: token } })
      .then(({data}) => {
        dispatch({
          type: ACCOUNT_FETCH_PROFILE,
          payload: data
        });
        if (callBack) {
          callBack();
        }
      })
      .catch(() => {
        dispatch({
          type: ACCOUNT_UPDATE_PROFILE_ERROR,
          payload: 'Oops, something went wrong. Please try again.'
        });
      })
  }
}
