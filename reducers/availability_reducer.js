// @flow

import { AVAILABILITY_FETCH_MONTH, AVAILABILITY_FETCH_ERROR } from '../actions/types';
import _ from 'lodash';

const INITIAL_STATE = {
  availabilityBlocks: [],
  currentMonth: new Date().getMonth() + 1,
  daysInMonth: [],
  error: ''
}

// making an object from the days that have availability and store the availability blocks in it
const reduceBlocksToDays = (array) => {
  return array.reduce((newObj, current) => {
    const day = new Date(current.day).getDate();
    	if (newObj[day] === undefined) {
    		newObj[day] = [];
      }
        newObj[day].push({ block: current.block, id: current.id });
    	   return newObj;
  }, {})
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case AVAILABILITY_FETCH_MONTH:
      return {
        ...state,
        availabilityBlocks: reduceBlocksToDays(action.payload.availabilityBlocks),
        month: action.payload.month,
        year: action.payload.year,
        daysInMonth: action.payload.daysInMonth,
        firstDayOfMonth: action.payload.firstDayOfMonth,
        error: '',
      };
    case AVAILABILITY_FETCH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
