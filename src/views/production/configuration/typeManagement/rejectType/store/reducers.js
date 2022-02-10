/*
     Title: Reducers for REJECT_TYPE
     Description: Reducers for REJECT_TYPE
     Author: Iqbal Hossain
     Date: 06-January-2022
     Modified: 10-January-2022
*/

import {
  ADD_REJECT_TYPE,
  DELETE_REJECT_TYPE,
  DELETE_REJECT_TYPE_BY_RANGE,
  FETCH_REJECT_TYPE,
  FETCH_REJECT_TYPE_BY_ID,
  FETCH_REJECT_TYPE_BY_QUERY,
  TOGGLE_REJECT_TYPE_SIDEBAR,
  TOGGLE_REJECT_TYPE_STATUS,
  UPDATE_REJECT_TYPE
} from './actionType';

const initialState = {
  items: [],
  queryData: [],
  total: 1,
  params: {},
  selectedItem: null,
  isOpenSidebar: false
};

export const rejectTypeReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_REJECT_TYPE:
      return { ...state, items: payload };
    case TOGGLE_REJECT_TYPE_SIDEBAR:
      return { ...state, isOpenSidebar: payload };
    case TOGGLE_REJECT_TYPE_STATUS: {
      return { ...state, selectedItem: { ...state.selectedItem, status: payload } };
    }
    case FETCH_REJECT_TYPE_BY_ID:
      return { ...state, selectedItem: payload.selectedItem };
    case FETCH_REJECT_TYPE_BY_QUERY:
      return {
        ...state,
        items: payload.items,
        total: payload.totalRecords,
        params: payload.params
      };
    case ADD_REJECT_TYPE:
      return { ...state, total: state.total + 1 };
    case UPDATE_REJECT_TYPE:
      return { ...state, total: state.total + 1 };
    case DELETE_REJECT_TYPE:
      return { ...state, items: payload };
    case DELETE_REJECT_TYPE_BY_RANGE:
      return { ...state, items: payload };
    default:
      return state;
  }
};

/** Change Log
 * 10-Jan-2022(Iqbal): Add TOGGLE_REJECT_TYPE_SIDEBAR, FETCH_REJECT_TYPE_BY_QUERY, ADD_REJECT_TYPE, DELETE_REJECT_TYPE, FETCH_REJECT_TYPE_BY_ID, UPDATE_REJECT_TYPE, DELETE_REJECT_TYPE_BY_RANGE
 */
