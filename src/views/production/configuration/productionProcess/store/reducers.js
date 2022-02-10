/*
     Title: Reducers for PRODUCTION_PROCESS
     Description: Reducers for PRODUCTION_PROCESS
     Author: Iqbal Hossain
     Date: 09-January-2022
     Modified: 09-January-2022
*/

import {
  ADD_PRODUCTION_PROCESS,
  DELETE_PRODUCTION_PROCESS,
  DELETE_PRODUCTION_PROCESS_BY_RANGE,
  DROP_DOWN_PRODUCTION_PROCESS,
  FETCH_PRODUCTION_PROCESS,
  FETCH_PRODUCTION_PROCESS_BY_ID,
  FETCH_PRODUCTION_PROCESS_BY_QUERY,
  TOGGLE_PRODUCTION_PROCESS_SIDEBAR,
  TOGGLE_PRODUCTION_PROCESS_STATUS,
  UPDATE_PRODUCTION_PROCESS
} from './actionType';

const initialState = {
  productionProcesses: [],
  queryData: [],
  total: 1,
  params: {},
  selectedItem: null,
  isOpenSidebar: false,
  dropDownItems: []
};

export const productionProcessReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_PRODUCTION_PROCESS:
      return { ...state, productionProcesses: payload };
    case TOGGLE_PRODUCTION_PROCESS_SIDEBAR:
      return { ...state, isOpenSidebar: payload };
    case TOGGLE_PRODUCTION_PROCESS_STATUS: {
      return { ...state, selectedItem: { ...state.selectedItem, status: payload } };
    }
    case FETCH_PRODUCTION_PROCESS_BY_ID:
      return { ...state, selectedItem: payload.selectedItem };
    case FETCH_PRODUCTION_PROCESS_BY_QUERY:
      return {
        ...state,
        productionProcesses: payload.productionProcesses,
        total: payload.totalRecords,
        params: payload.params
      };
    case ADD_PRODUCTION_PROCESS:
      return { ...state, total: state.total + 1 };
    case UPDATE_PRODUCTION_PROCESS:
      return { ...state, total: state.total + 1 };
    case DELETE_PRODUCTION_PROCESS:
      return { ...state, productionProcesses: payload };
    case DELETE_PRODUCTION_PROCESS_BY_RANGE:
      return { ...state, productionProcesses: payload };
    case DROP_DOWN_PRODUCTION_PROCESS:
      return { ...state, dropDownItems: payload.dropDownItems };
    default:
      return state;
  }
};

/** Change Log
 * 08-Jan-2022(Iqbal):Add TOGGLE_PRODUCTION_PROCESS_SIDEBAR, FETCH_PRODUCTION_PROCESS_BY_QUERY, ADD_PRODUCTION_PROCESS, DELETE_PRODUCTION_PROCESS, FETCH_PRODUCTION_PROCESS_BY_ID, UPDATE_PRODUCTION_PROCESS, DELETE_PRODUCTION_PROCESS_BY_RANGE
 */
