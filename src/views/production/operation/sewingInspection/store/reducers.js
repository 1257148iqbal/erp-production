/*
     Title: Reducers for SEWING_INSPECTION
     Description: Reducers for SEWING_INSPECTION
     Author: Iqbal Hossain
     Date: 29-January-2022
     Modified: 29-January-2022
*/

import {
  FETCH_SEWING_INSPECTION,
  FETCH_SEWING_INSPECTION_BY_ID,
  FETCH_SEWING_INSPECTION_BY_QUERY
} from './actionType';

const initialState = {
  items: [],
  queryData: [],
  total: 1,
  params: {},
  selectedItem: null
};

export const sewingInspectionReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_SEWING_INSPECTION:
      return { ...state, items: payload };
    case FETCH_SEWING_INSPECTION_BY_ID:
      return { ...state, selectedItem: payload.selectedItem };
    case FETCH_SEWING_INSPECTION_BY_QUERY:
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
 * 29-Jan-2022(Iqbal):Add TOGGLE_SEWING_INSPECTION_SIDEBAR, FETCH_SEWING_INSPECTION_BY_QUERY, FETCH_SEWING_INSPECTION_BY_ID,
 */
