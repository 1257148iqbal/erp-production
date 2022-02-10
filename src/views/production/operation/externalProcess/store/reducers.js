/*
     Title: Reducers for EXTERNAL_PROCESS
     Description: Reducers for EXTERNAL_PROCESS
     Author: Iqbal Hossain
     Date: 24-January-2022
     Modified: 24-January-2022
*/

import {
  FETCH_EXTERNAL_PROCESS,
  FETCH_EXTERNAL_PROCESS_BY_ID,
  FETCH_EXTERNAL_PROCESS_BY_QUERY,
  FETCH_EXTERNAL_PROCESS_BY_RANGE
} from './actionType';

const initialState = {
  items: [],
  queryData: [],
  total: 1,
  params: {},
  selectedItem: null
};

export const externalProcessReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_EXTERNAL_PROCESS:
      return { ...state, items: payload };
    case FETCH_EXTERNAL_PROCESS_BY_ID:
      return { ...state, selectedItem: payload.selectedItem };
    case FETCH_EXTERNAL_PROCESS_BY_QUERY:
      return {
        ...state,
        items: payload.items,
        total: payload.totalRecords,
        params: payload.params
      };
    case FETCH_EXTERNAL_PROCESS_BY_RANGE:
      return { ...state, items: payload };
    default:
      return state;
  }
};

/** Change Log
 * 24-Jan-2022(Iqbal):Add FETCH_EXTERNAL_PROCESS_BY_QUERY, FETCH_EXTERNAL_PROCESS_BY_ID, FETCH_EXTERNAL_PROCESS_BY_RANGE
 */
