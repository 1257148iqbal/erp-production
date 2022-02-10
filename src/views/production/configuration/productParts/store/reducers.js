/**
 * Title: Reducer for product parts
 * Description:
 * Author: Nasir Ahmed
 * Date: 09-January-2022
 * Modified: 09-January-2022
 **/

import {
  ADD_PRODUCT_PART,
  DELETE_PRODUCT_PART,
  DELETE_PRODUCT_PART_BY_RANGE,
  FETCH_PRODUCT_PARTS,
  FETCH_PRODUCT_PARTS_BY_QUERY,
  FETCH_PRODUCT_PART_BY_ID,
  TOGGLE_PRODUCT_PART_SIDEBAR,
  TOGGLE_PRODUCT_PART_STATUS,
  UPDATE_PRODUCT_PART
} from './actionType';

const initialState = {
  items: [],
  queryData: [],
  total: 1,
  params: {},
  selectedItem: null,
  isOpenSidebar: false
};

export const productPartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_PRODUCT_PARTS:
      return { ...state, items: payload };
    case TOGGLE_PRODUCT_PART_SIDEBAR:
      return { ...state, isOpenSidebar: payload };
    case TOGGLE_PRODUCT_PART_STATUS:
      return { ...state, selectedItem: { ...state.selectedItem, status: payload } };
    case FETCH_PRODUCT_PART_BY_ID:
      return { ...state, selectedItem: action.selectedItem };
    case FETCH_PRODUCT_PARTS_BY_QUERY:
      return {
        ...state,
        items: payload.items,
        total: payload.totalRecords,
        params: action.params
      };
    case ADD_PRODUCT_PART:
      return { ...state, total: state.total + 1 };
    case UPDATE_PRODUCT_PART:
      return { ...state, total: state.total + 1 };
    case DELETE_PRODUCT_PART: {
      return { ...state, items: payload };
    }
    case DELETE_PRODUCT_PART_BY_RANGE: {
      return { ...state, items: payload };
    }

    default:
      return state;
  }
};
