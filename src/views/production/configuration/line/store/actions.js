/*
     Title: Actions for Line
     Description: Actions for Line
     Author: Iqbal Hossain
     Date: 06-January-2022
     Modified: 06-January-2022
*/

import { baseAxios } from 'services';
import { LINE_API } from 'services/api-end-points/production/v1';
import { confirmDialog } from 'utility/custom/ConfirmDialog';
import { notify } from 'utility/custom/notifications';
import { confirmObj } from 'utility/enums';
import {
  ADD_LINE,
  DELETE_LINE,
  DELETE_LINE_BY_RANGE,
  FETCH_LINE,
  FETCH_LINE_BY_ID,
  FETCH_LINE_BY_QUERY,
  TOGGLE_LINE_SIDEBAR,
  TOGGLE_LINE_STATUS,
  UPDATE_LINE
} from './actionType';

export const fetchLine = () => async dispatch => {
  const response = await baseAxios.get(`${LINE_API.fetch_all}`);
  dispatch({
    type: FETCH_LINE,
    payload: response.data
  });
};

//Get Data by Query
export const fetchLinesByQuery = params => {
  return async dispatch => {
    try {
      const res = await baseAxios.get(`${LINE_API.fetch_by_query}`, params);
      dispatch({
        type: FETCH_LINE_BY_QUERY,
        payload: {
          items: res.data.data,
          totalRecords: res.data.totalRecords,
          params
        }
      });
    } catch (error) {
      notify('error', 'Something went wrong!!! Please try again');
    }
  };
};

//Get by id
export const fetchLineById = id => {
  return async dispatch => {
    try {
      const res = await baseAxios.get(`${LINE_API.fetch_by_id}`, { id });
      dispatch({
        type: FETCH_LINE_BY_ID,
        payload: {
          selectedItem: res.data.data ? res.data.data : null
        }
      });
    } catch (err) {
      notify('error', 'Something went wrong!!! Please try again');
    }
  };
};

//Add new
export const addLine = (data, params) => {
  return async dispatch => {
    try {
      const res = await baseAxios.post(`${LINE_API.add}`, data);
      dispatch({
        type: ADD_LINE,
        payload: data
      });
      notify('success', res.data.message);
      dispatch(fetchLinesByQuery(params));
    } catch (err) {
      notify('error', 'Something went wrong!!! Please try again');
    }
  };
};

//Update
export const updateLine = (data, params) => {
  return async dispatch => {
    try {
      const res = await baseAxios.post(`${LINE_API.update}`, { data });
      dispatch({
        type: UPDATE_LINE,
        payload: data
      });
      notify('success', res.data.message);
      dispatch(fetchLinesByQuery(params));
    } catch (err) {
      notify('error', 'Something went wrong!!! Please try again');
    }
  };
};

//Delete
export const deleteLine = id => {
  return async dispatch => {
    const e = await confirmDialog(confirmObj);
    if (e.isConfirmed) {
      try {
        const res = await baseAxios.delete(`${LINE_API.delete}`, { id });
        dispatch({
          type: DELETE_LINE,
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
export const deleteLineByRange = ids => {
  return async dispatch => {
    const e = await confirmDialog(confirmObj);
    if (e.isConfirmed) {
      try {
        const res = await baseAxios.delete(`${LINE_API.delete_by_range}`, { ids });
        dispatch({
          type: DELETE_LINE_BY_RANGE,
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
export const toggleLineSidebar = condition => dispatch => {
  dispatch({
    type: TOGGLE_LINE_SIDEBAR,
    payload: condition
  });
};

//Toggle Status
export const toggleLineStatus = status => dispatch => {
  dispatch({
    type: TOGGLE_LINE_STATUS,
    payload: status
  });
};

/** Change Log
 * 08-Jan-2022(Iqbal): Create Function/Method deleteLineByRange, deleteLine, updateLine, addLine, fetchLinesByQuery, fetchLineById
 */
