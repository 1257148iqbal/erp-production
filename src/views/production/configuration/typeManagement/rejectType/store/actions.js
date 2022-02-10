/*
     Title: Actions for RejectType
     Description: Actions for RejectType
     Author: Iqbal Hossain
     Date: 06-January-2022
     Modified: 10-January-2022
*/

import { baseAxios } from 'services';
import { REJECT_TYPE_API } from 'services/api-end-points/production/v1';
import { confirmDialog } from 'utility/custom/ConfirmDialog';
import { notify } from 'utility/custom/notifications';
import { confirmObj } from 'utility/enums';
import {
  ADD_REJECT_TYPE,
  DELETE_REJECT_TYPE,
  DELETE_REJECT_TYPE_BY_RANGE,
  FETCH_REJECT_TYPE,
  FETCH_REJECT_TYPE_BY_ID,
  FETCH_REJECT_TYPE_BY_QUERY,
  TOGGLE_REJECT_TYPE_SIDEBAR,
  TOGGLE_REJECT_TYPE_STATUS,
  UPDATE_REJECT_TYPE
} from './actionType';

export const fetchRejectType = () => async dispatch => {
  const response = await baseAxios.get(`${REJECT_TYPE_API.fetch_all}`);
  dispatch({
    type: FETCH_REJECT_TYPE,
    payload: response.data
  });
};

//Get Data by Query
export const fetchRejectTypesByQuery = params => {
  return async dispatch => {
    try {
      const res = await baseAxios.get(`${REJECT_TYPE_API.fetch_by_query}`, params);
      dispatch({
        type: FETCH_REJECT_TYPE_BY_QUERY,
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
export const fetchRejectTypeById = id => {
  return async dispatch => {
    try {
      const res = await baseAxios.get(`${REJECT_TYPE_API.fetch_by_id}`, { id });
      dispatch({
        type: FETCH_REJECT_TYPE_BY_ID,
        payload: {
          selectedItem: res.data ? res.data : null
        }
      });
    } catch (err) {
      notify('error', 'Something went wrong!!! Please try again');
    }
  };
};

//Add new
export const addRejectType = (data, params) => {
  return async dispatch => {
    try {
      const res = await baseAxios.post(`${REJECT_TYPE_API.add}`, data);
      dispatch({
        type: ADD_REJECT_TYPE,
        payload: data
      });
      notify('success', res.data.message);
      dispatch(fetchRejectTypesByQuery(params));
    } catch (err) {
      notify('error', 'Something went wrong!!! Please try again');
    }
  };
};

//Update
export const updateRejectType = (data, params) => {
  return async dispatch => {
    try {
      const res = await baseAxios.post(`${REJECT_TYPE_API.update}`, { data });
      dispatch({
        type: UPDATE_REJECT_TYPE,
        payload: data
      });
      notify('success', res.data.message);
      dispatch(fetchRejectTypesByQuery(params));
    } catch (err) {
      notify('error', 'Something went wrong!!! Please try again');
    }
  };
};

//Delete
export const deleteRejectType = id => {
  return async dispatch => {
    const e = await confirmDialog(confirmObj);
    if (e.isConfirmed) {
      try {
        const res = await baseAxios.delete(`${REJECT_TYPE_API.delete}`, { id });
        dispatch({
          type: DELETE_REJECT_TYPE,
          payload: res.data.data
        });
        notify('success', res.data.message);
      } catch (err) {
        notify('error', 'Something went wrong!!! Please tyr again');
      }
    }
  };
};

//Delete by Range
export const deleteRejectTypeByRange = ids => {
  return async dispatch => {
    const e = await confirmDialog(confirmObj);
    if (e.isConfirmed) {
      try {
        const res = await baseAxios.delete(`${REJECT_TYPE_API.delete_by_range}`, { ids });
        dispatch({
          type: DELETE_REJECT_TYPE_BY_RANGE,
          payload: res.data.data
        });
        notify('success', res.data.message);
      } catch (err) {
        notify('error', 'Something went wrong!!! Please tyr again');
      }
    }
  };
};

//Open Sidebar
export const toggleRejectTypeSidebar = condition => dispatch => {
  dispatch({
    type: TOGGLE_REJECT_TYPE_SIDEBAR,
    payload: condition
  });
};

//Toggle Status
export const toggleRejectTypeStatus = condition => dispatch => {
  dispatch({
    type: TOGGLE_REJECT_TYPE_STATUS,
    payload: condition
  });
};

/** Change Log
 * 10-Jan-2022(Iqbal): Create Function/Method deleteRejectTypeByRange, deleteRejectType, updateRejectType, addRejectType, fetchRejectTypesByQuery, fetchRejectTypeById
 */
