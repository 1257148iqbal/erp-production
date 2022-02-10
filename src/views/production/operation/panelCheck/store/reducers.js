/*
     Title: Reducers for PANEL_CHECK
     Description: Reducers for PANEL_CHECK
     Author: Iqbal Hossain
     Date: 22-January-2022
     Modified: 22-January-2022
*/

import {
  FETCH_PANEL_CHECK,
  FETCH_PANEL_CHECK_BY_ID,
  FETCH_PANEL_CHECK_BY_QUERY
} from './actionType';

const initialState = {
  items: [],
  queryData: [],
  total: 1,
  params: {},
  selectedItem: null
};

export const panelCheckReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_PANEL_CHECK:
      return { ...state, items: payload };
    case FETCH_PANEL_CHECK_BY_ID:
      return { ...state, selectedItem: payload.selectedItem };
    case FETCH_PANEL_CHECK_BY_QUERY:
      return {
        ...state,
        items: payload.items,
        total: payload.totalRecords,
        params: payload.params
      };
    default:
      return state;
  }
};

/** Change Log
 * 22-Jan-2022(Iqbal):Add TOGGLE_PANEL_CHECK_SIDEBAR, FETCH_PANEL_CHECK_BY_QUERY, ADD_PANEL_CHECK, DELETE_PANEL_CHECK, FETCH_PANEL_CHECK_BY_ID, UPDATE_PANEL_CHECK, DELETE_PANEL_CHECK_BY_RANGE
 */
