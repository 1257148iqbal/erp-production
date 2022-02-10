/*
     Title: Reducers for TIME
     Description: Reducers for TIME
     Author: Iqbal Hossain
     Date: 06-January-2022
     Modified: 11-January-2022
*/

import {
  ADD_TIME,
  DELETE_TIME,
  DELETE_TIME_BY_RANGE,
  FETCH_TIME,
  FETCH_TIME_BY_ID,
  FETCH_TIME_BY_QUERY,
  TOGGLE_TIME_SIDEBAR,
  TOGGLE_TIME_STATUS,
  UPDATE_TIME
} from './actionType';

const initialState = {
  items: [],
  queryData: [],
  total: 1,
  params: {},
  selectedItem: null,
  isOpenSidebar: false
};

export const timeReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_TIME:
      return { ...state, items: payload };
    case TOGGLE_TIME_SIDEBAR:
      return { ...state, isOpenSidebar: payload };
    case TOGGLE_TIME_STATUS:
      return { ...state, selectedItem: { ...state.selectedItem, status: payload } };
    case FETCH_TIME_BY_ID:
      return { ...state, selectedItem: payload.selectedItem };
    case FETCH_TIME_BY_QUERY:
      return {
        ...state,
        items: payload.items,
        total: payload.totalRecords,
        params: payload.params
      };
    case ADD_TIME:
      return { ...state, total: state.total + 1 };
    case UPDATE_TIME:
      return { ...state, total: state.total + 1 };
    case DELETE_TIME:
      return { ...state, items: payload };
    case DELETE_TIME_BY_RANGE:
      return { ...state, items: payload };
    default:
      return state;
  }
};

/** Change Log
 * 11-Jan-2022(Iqbal):Add TOGGLE_TIME_SIDEBAR, FETCH_TIME_BY_QUERY, ADD_TIME, DELETE_TIME, FETCH_TIME_BY_ID, UPDATE_TIME, DELETE_TIME_BY_RANGE
 */
