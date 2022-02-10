/**
 * Title: Action creators for product parts
 * Description: Action creators for product parts
 * Author: Nasir Ahmed
 * Date: 09-January-2022
 * Modified: 09-January-2022
 **/

import { baseAxios } from 'services';
import { PRODUCT_PARTS_API } from 'services/api-end-points/production/v1';
import { confirmDialog } from 'utility/custom/ConfirmDialog';
import { notify } from 'utility/custom/notifications';
import { confirmObj } from 'utility/enums';
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

export const fetchProductParts = () => async dispatch => {
  try {
    const response = await baseAxios.get(`${PRODUCT_PARTS_API.fetch_all}`);
    dispatch({
      type: FETCH_PRODUCT_PARTS,
      payload: response.data
    });
  } catch (err) {
    notify('error', 'Something went wrong!!! Please try again');
  }
};

//Get Data by Query
export const fetchProductPartsByQuery = params => {
  return async dispatch => {
    try {
      const res = await baseAxios.get(`${PRODUCT_PARTS_API.fetch_by_query}`, params);
      dispatch({
        type: FETCH_PRODUCT_PARTS_BY_QUERY,
        payload: {
          items: res.data.data,
          totalRecords: res.data.totalRecords,
          params
        }
      });
    } catch (err) {
      notify('error', 'Something went wrong!!! Please try again');
    }
  };
};

//Get by id
export const fetchProductPartById = id => {
  return async dispatch => {
    try {
      const res = await baseAxios.get(`${PRODUCT_PARTS_API.fetch_by_id}`, { id });
      dispatch({
        type: FETCH_PRODUCT_PART_BY_ID,
        selectedItem: res.data ? res.data : null
      });
    } catch (err) {
      notify('error', 'Something went wrong!!! Please try again');
    }
  };
};

//Add new
export const addProductPart = (data, params) => {
  return async dispatch => {
    try {
      const res = await baseAxios.post(`${PRODUCT_PARTS_API.add}`, data);
      dispatch({
        type: ADD_PRODUCT_PART,
        payload: data
      });
      notify('success', res.data.message);
      dispatch(fetchProductPartsByQuery(params));
    } catch (err) {
      notify('error', 'Something went wrong!!! Please try again');
    }
  };
};

//Update line
export const updateProductPart = (data, params) => {
  return async dispatch => {
    try {
      const res = await baseAxios.post(`${PRODUCT_PARTS_API.update}`, { data });
      dispatch({
        type: UPDATE_PRODUCT_PART,
        payload: data
      });
      notify('success', res.data.message);
      dispatch(fetchProductPartsByQuery(params));
    } catch (err) {
      notify('error', 'Something went wrong!!! Please try again');
    }
  };
};

//Delete line
export const deleteProductPart = id => {
  return async dispatch => {
    const e = await confirmDialog(confirmObj);
    if (e.isConfirmed) {
      try {
        const res = await baseAxios.delete(`${PRODUCT_PARTS_API.delete}`, { id });
        dispatch({
          type: DELETE_PRODUCT_PART,
          payload: res.data.data
        });
        notify('success', res.data.message);
      } catch (err) {
        notify('error', 'Something went wrong!!! Please try again');
      }
    }
  };
};
export const deleteProductPartByRange = ids => {
  return async dispatch => {
    const e = await confirmDialog(confirmObj);
    if (e.isConfirmed) {
      try {
        const res = await baseAxios.delete(`${PRODUCT_PARTS_API.delete_by_range}`, { ids });
        dispatch({
          type: DELETE_PRODUCT_PART_BY_RANGE,
          payload: res.data.data
        });
        notify('success', res.data.message);
      } catch (err) {
        notify('error', 'Something went wrong!!! Please try again');
      }
    }
  };
};

//Toggle Sidebar
export const toggleProductPartSidebar = condition => dispatch => {
  dispatch({
    type: TOGGLE_PRODUCT_PART_SIDEBAR,
    payload: condition
  });
};

//Toggle Sidebar
export const toggleProductPartStutas = condition => dispatch => {
  dispatch({
    type: TOGGLE_PRODUCT_PART_STATUS,
    payload: condition
  });
};
