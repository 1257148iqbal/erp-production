/*
     Title: Reducers for Line
     Description: Reducers for Line
     Author: Iqbal Hossain
     Date: 06-January-2022
     Modified: 06-January-2022
*/

import {
  ADD_LINE,
  DELETE_LINE,
  DELETE_LINE_BY_RANGE,
  FETCH_LINE,
  FETCH_LINE_BY_ID,
  FETCH_LINE_BY_QUERY,
  TOGGLE_LINE_SIDEBAR,
  TOGGLE_LINE_STATUS,
  UPDATE_LINE
} from './actionType';

const initialState = {
  items: [],
  queryData: [],
  total: 1,
  params: {},
  selectedItem: null,
  isOpenSidebar: false
};

export const lineReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_LINE:
      return { ...state, items: payload };
    case TOGGLE_LINE_SIDEBAR:
      return { ...state, isOpenSidebar: payload };
    case TOGGLE_LINE_STATUS: {
      return { ...state, selectedItem: { ...state.selectedItem, status: payload } };
    }
    case FETCH_LINE_BY_ID:
      return { ...state, selectedItem: payload.selectedItem };
    case FETCH_LINE_BY_QUERY:
      return {
        ...state,
        items: payload.items,
        total: payload.totalRecords,
        params: payload.params
      };
    case ADD_LINE:
      return { ...state, total: state.total + 1 };
    case UPDATE_LINE:
      return { ...state, total: state.total + 1 };
    case DELETE_LINE:
      return { ...state, items: payload };
    case DELETE_LINE_BY_RANGE:
      return { ...state, items: payload };
    default:
      return state;
  }
};

/** Change Log
 * 08-Jan-2022(Iqbal):Add TOGGLE_LINE_SIDEBAR, FETCH_LINE_BY_QUERY, ADD_LINE, DELETE_LINE, FETCH_LINE_BY_ID, UPDATE_LINE, DELETE_LINE_BY_RANGE
 */
