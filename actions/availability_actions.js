// @flow
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { AVAILABILITY_FETCH_MONTH, AVAILABILITY_FETCH_ERROR } from './types';

const ROOT_URL = 'http://localhost:8080';

export function getAvailability(monthsFromNow = 0) {
  const currentMonth = new Date().getMonth() + 1;
  const days = new Date(new Date().getFullYear(), new Date().getMonth() + (1 + monthsFromNow), 0).getDate();
  const daysInMonth = Array.from({length: days}, (v, i) => i);
  const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + monthsFromNow, 1).getDay()

  const date = new Date(new Date().getFullYear(), new Date().getMonth() + monthsFromNow);
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const request = `${ROOT_URL}/availability?month=${month}&year=${year}`;

  return async (dispatch) => {
    // console.log(daysInMonth);
    let token = AsyncStorage.getItem('token');
    axios.get(request, { headers: { authorization: token }})
      .then(({data}) => {
        const payload = {
          availabilityBlocks: data,
          month,
          daysInMonth,
          firstDayOfMonth
        }
        dispatch({
          type: AVAILABILITY_FETCH_MONTH,
          payload,
        })
      }).catch(() => {
        dispatch({
          type: AVAILABILITY_FETCH_ERROR,
          payload: 'oops there was a problem fetching the availability, please try again'
        })
      })
  }
}
