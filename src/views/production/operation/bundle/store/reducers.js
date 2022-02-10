/*
     Title: Reducers for BUNDLE
     Description: Reducers for BUNDLE
     Author: Iqbal Hossain
     Date: 06-January-2022
     Modified: 06-January-2022
*/

import {
  FETCH_BUNDLE,
  FETCH_BUNDLE_BY_ID,
  FETCH_BUNDLE_BY_QUERY,
  FETCH_BUNDLE_BY_RANGE
} from './actionType';

const initialState = {
  items: [],
  queryData: [],
  total: 1,
  params: {},
  selectedItem: null
};

export const bundleReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_BUNDLE:
      return { ...state, items: payload };
    case FETCH_BUNDLE_BY_ID:
      return { ...state, selectedItem: payload.selectedItem };
    case FETCH_BUNDLE_BY_QUERY:
      return {
        ...state,
        items: payload.items,
        total: payload.totalRecords,
        params: payload.params
      };
    case FETCH_BUNDLE_BY_RANGE:
      return { ...state, items: payload };
    default:
      return state;
  }
};

/** Change Log
 * 08-Jan-2022(Iqbal):Add TOGGLE_BUNDLE_SIDEBAR, FETCH_BUNDLE_BY_QUERY, ADD_BUNDLE, DELETE_BUNDLE, FETCH_BUNDLE_BY_ID, UPDATE_BUNDLE, DELETE_BUNDLE_BY_RANGE
 */
