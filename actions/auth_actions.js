// @flow
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { AUTH_USER, AUTH_ERROR, DEAUTH_USER } from './types';

const ROOT_URL = 'https://mysql-course-rplay.c9users.io';

export function loginUser(email, password, navigate) {
  const request = `${ROOT_URL}/login`;

  return (dispatch) => {
    axios.post(request, { email, password })
      .then(({data}) => {
        dispatch({
          type: AUTH_USER,
        });
        AsyncStorage.setItem('token', data.token);
        AsyncStorage.setItem('role', data.role);
        if (data.role === 'user') {
          navigate('availabilityUser');
        } else if (data.role === 'admin') {
          navigate('availabilityAdmin');
        }
      }).catch(() => {
        dispatch({
          type: AUTH_ERROR,
          payload: 'bad login info'
        })
      })
  }
}

export function signupUser(email, password, first_name, last_name, phone, navigate) {
  const request = `${ROOT_URL}/signup`;

  return (dispatch) => {
    axios.post(request, { email, password, first_name, last_name, phone })
      .then(({data}) => {
        dispatch({
          type: AUTH_USER,
        });
        AsyncStorage.setItem('token', data.token);
        AsyncStorage.setItem('role', data.role);
        if (data.role === 'user') {
          navigate('availabilityCalendarUser');
        } else if (data.role === 'admin') {
          navigate('availabilityCalendarAdmin');
        }
      }).catch(() => {
        dispatch({
          type: AUTH_ERROR,
          payload: 'please choose another email'
        })
      })
  }
}

export function logoutUser(navigate) {
  return (dispatch) => {
    dispatch({
      type: DEAUTH_USER
    });
    AsyncStorage.clear();
    navigate('auth');
  }
}
