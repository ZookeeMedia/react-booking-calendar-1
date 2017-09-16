// @flow
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { AUTH_USER, AUTH_ERROR, DEAUTH_USER } from './types';

const ROOT_URL = 'http://localhost:8080';

export function loginUser(email, password, callBack) {
  const request = `${ROOT_URL}/login`;

  return (dispatch) => {
    axios.post(request, { email, password })
      .then(({data}) => {
        dispatch({
          type: AUTH_USER,
        });
        AsyncStorage.setItem('token', data.token);
        callBack();
      }).catch(() => {
        dispatch({
          type: AUTH_ERROR,
          payload: 'bad login info'
        })
      })
  }
}

export function signupUser(email, password, first_name, last_name, phone, callBack) {
  const request = `${ROOT_URL}/signup`;

  return (dispatch) => {
    axios.post(request, { email, password, first_name, last_name, phone })
      .then(({data}) => {
        dispatch({
          type: AUTH_USER,
        });
        AsyncStorage.setItem('token', data.token);
        callBack();
      }).catch(() => {
        dispatch({
          type: AUTH_ERROR,
          payload: 'please choose another email'
        })
      })
  }
}
