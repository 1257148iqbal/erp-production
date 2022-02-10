/*
     Title: Reducers for ZONE
     Description: Reducers for ZONE
     Author: Iqbal Hossain
     Date: 09-January-2022
     Modified: 09-January-2022
*/

import {
  ADD_ZONE,
  DELETE_ZONE,
  DELETE_ZONE_BY_RANGE,
  FETCH_ZONE,
  FETCH_ZONE_BY_ID,
  FETCH_ZONE_BY_QUERY,
  TOGGLE_ZONE_SIDEBAR,
  TOGGLE_ZONE_STATUS,
  UPDATE_ZONE
} from './actionType';

const initialState = {
  items: [],
  queryData: [],
  total: 1,
  params: {},
  selectedItem: null,
  isOpenSidebar: false
};

export const zoneReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ZONE:
      return { ...state, items: payload };
    case TOGGLE_ZONE_SIDEBAR:
      return { ...state, isOpenSidebar: payload };
    case TOGGLE_ZONE_STATUS: {
      return { ...state, selectedItem: { ...state.selectedItem, status: payload } };
    }
    case FETCH_ZONE_BY_ID:
      return { ...state, selectedItem: payload.selectedItem };
    case FETCH_ZONE_BY_QUERY:
      return {
        ...state,
        items: payload.items,
        total: payload.totalRecords,
        params: payload.params
      };
    case ADD_ZONE:
      return { ...state, total: state.total + 1 };
    case UPDATE_ZONE:
      return { ...state, total: state.total + 1 };
    case DELETE_ZONE:
      return { ...state, items: payload };
    case DELETE_ZONE_BY_RANGE:
      return { ...state, items: payload };
    default:
      return state;
  }
};

/** Change Log
 * 09-Jan-2022(Iqbal):Add TOGGLE_ZONE_SIDEBAR, FETCH_ZONE_BY_QUERY, ADD_ZONE, DELETE_ZONE, FETCH_ZONE_BY_ID, UPDATE_ZONE, DELETE_ZONE_BY_RANGE
 */
