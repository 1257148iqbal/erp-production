/*
     Title: Reducers for ASSIGN_TARGET
     Description: Reducers for ASSIGN_TARGET
     Author: Iqbal Hossain
     Date: 27-January-2022
     Modified: 27-January-2022
*/

import {
  FETCH_ASSIGN_TARGET,
  FETCH_ASSIGN_TARGET_BY_ID,
  FETCH_ASSIGN_TARGET_BY_QUERY,
  SET_ASSIGN_TARGET_BY_RANGE
} from './actionType';

const initialState = {
  items: [],
  queryData: [],
  total: 1,
  params: {},
  selectedItem: null
};

export const assignTargetReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ASSIGN_TARGET:
      return { ...state, items: payload };
    case FETCH_ASSIGN_TARGET_BY_ID:
      return { ...state, selectedItem: payload.selectedItem };
    case FETCH_ASSIGN_TARGET_BY_QUERY:
      return {
        ...state,
        items: payload.items,
        total: payload.totalRecords,
        params: payload.params
      };
    case SET_ASSIGN_TARGET_BY_RANGE:
      return { ...state, items: payload };
    default:
      return state;
  }
};

/** Change Log
 * 27-Jan-2022(Iqbal): Add FETCH_ASSIGN_TARGET_BY_QUERY,FETCH_ASSIGN_TARGET_BY_ID, FETCH_ASSIGN_TARGET_BY_RANGE
 */
