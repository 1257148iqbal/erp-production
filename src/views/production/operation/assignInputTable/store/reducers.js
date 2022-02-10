/*
     Title: Reducers for ASSIGN_INPUT_TABLE
     Description: Reducers for ASSIGN_INPUT_TABLE
     Author: Iqbal Hossain
     Date: 26-January-2022
     Modified: 26-January-2022
*/

import {
  FETCH_ASSIGN_INPUT_TABLE,
  FETCH_ASSIGN_INPUT_TABLE_BY_ID,
  FETCH_ASSIGN_INPUT_TABLE_BY_QUERY,
  FETCH_ASSIGN_INPUT_TABLE_BY_RANGE
} from './actionType';

const initialState = {
  items: [],
  queryData: [],
  total: 1,
  params: {},
  selectedItem: null
};

export const assignInputTableReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ASSIGN_INPUT_TABLE:
      return { ...state, items: payload };
    case FETCH_ASSIGN_INPUT_TABLE_BY_ID:
      return { ...state, selectedItem: payload.selectedItem };
    case FETCH_ASSIGN_INPUT_TABLE_BY_QUERY:
      return {
        ...state,
        items: payload.items,
        total: payload.totalRecords,
        params: payload.params
      };
    case FETCH_ASSIGN_INPUT_TABLE_BY_RANGE:
      return { ...state, items: payload };
    default:
      return state;
  }
};

/** Change Log
 * 26-Jan-2022(Iqbal): Add FETCH_ASSIGN_INPUT_TABLE_BY_QUERY,FETCH_ASSIGN_INPUT_TABLE_BY_ID, FETCH_ASSIGN_INPUT_TABLE_BY_RANGE
 */
