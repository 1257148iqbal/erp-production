/*
     Title: Reducers for CUT_PLAN
     Description: Reducers for CUT_PLAN
     Author: Iqbal Hossain
     Date: 06-January-2022
     Modified: 06-January-2022
*/

import {
  ADD_CUT_PLAN,
  DELETE_CUT_PLAN,
  DELETE_CUT_PLAN_BY_RANGE,
  FETCH_CUT_PLAN,
  FETCH_CUT_PLAN_BY_ID,
  FETCH_CUT_PLAN_BY_QUERY,
  UPDATE_CUT_PLAN
} from './actionType';

const initialState = {
  items: [],
  queryData: [],
  total: 1,
  params: {},
  selectedItem: null
};

export const cutPlanReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_CUT_PLAN:
      return { ...state, items: payload };
    case FETCH_CUT_PLAN_BY_ID:
      return { ...state, selectedItem: payload.selectedItem };
    case FETCH_CUT_PLAN_BY_QUERY:
      return {
        ...state,
        items: payload.items,
        total: payload.totalRecords,
        params: payload.params
      };
    case ADD_CUT_PLAN:
      return { ...state, total: state.total + 1 };
    case UPDATE_CUT_PLAN:
      return { ...state, total: state.total + 1 };
    case DELETE_CUT_PLAN:
      return { ...state, items: payload };
    case DELETE_CUT_PLAN_BY_RANGE:
      return { ...state, items: payload };
    default:
      return state;
  }
};

/** Change Log
 * 08-Jan-2022(Iqbal):Add TOGGLE_CUT_PLAN_SIDEBAR, FETCH_CUT_PLAN_BY_QUERY, ADD_CUT_PLAN, DELETE_CUT_PLAN, FETCH_CUT_PLAN_BY_ID, UPDATE_CUT_PLAN, DELETE_CUT_PLAN_BY_RANGE
 */
