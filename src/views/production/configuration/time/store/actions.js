/*
     Title: Actions for TIME
     Description: Actions for TIME
     Author: Iqbal Hossain
     Date: 06-January-2022 
     Modified: 11-January-2022
*/

import { baseAxios } from 'services';
import { TIME_API } from 'services/api-end-points/production/v1';
import { confirmDialog } from 'utility/custom/ConfirmDialog';
import { notify } from 'utility/custom/notifications';
import { confirmObj } from 'utility/enums';
import {
  ADD_TIME,
  DELETE_TIME,
  DELETE_TIME_BY_RANGE,
  FETCH_TIME,
  FETCH_TIME_BY_ID,
  FETCH_TIME_BY_QUERY,
  TOGGLE_TIME_SIDEBAR,
  TOGGLE_TIME_STATUS,
  UPDATE_TIME
} from './actionType';

export const fetchTime = () => async dispatch => {
  const response = await baseAxios.get(`${TIME_API.fetch_all}`);
  dispatch({
    type: FETCH_TIME,
    payload: response.data
  });
};

//Get Data by Query
export const fetchTimesByQuery = params => {
  return async dispatch => {
    await baseAxios.get(`${TIME_API.fetch_by_query}`, params).then(response => {
      dispatch({
        type: FETCH_TIME_BY_QUERY,
        payload: {
          items: response.data.data,
          totalRecords: response.data.totalRecords,
          params
        }
      });
    });
  };
};

//Get by id
export const fetchTimeById = id => {
  return async dispatch => {
    try {
      const res = await baseAxios.get(`${TIME_API.fetch_by_id}`, { id });
      dispatch({
        type: FETCH_TIME_BY_ID,
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
export const addTime = (data, params) => {
  return async dispatch => {
    try {
      const res = await baseAxios.post(`${TIME_API.add}`, data);
      dispatch({
        type: ADD_TIME,
        payload: data
      });
      notify('success', res.data.message);
      dispatch(fetchTimesByQuery(params));
    } catch (err) {
      notify('error', 'Something went wrong!!! Please try again');
    }
  };
};

//Update
export const updateTime = (data, params) => {
  return async dispatch => {
    try {
      const res = await baseAxios.post(`${TIME_API.update}`, { data });
      dispatch({
        type: UPDATE_TIME,
        payload: data
      });
      notify('success', res.data.message);
      dispatch(fetchTimesByQuery(params));
    } catch (err) {
      notify('error', 'Something went wrong!!! Please try again');
    }
  };
};

//Delete
export const deleteTime = id => {
  return async dispatch => {
    const e = await confirmDialog(confirmObj);
    if (e.isConfirmed) {
      try {
        const res = await baseAxios.delete(`${TIME_API.delete}`, { id });
        dispatch({
          type: DELETE_TIME,
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
export const deleteTimeByRange = ids => {
  return async dispatch => {
    const e = await confirmDialog(confirmObj);
    if (e.isConfirmed) {
      try {
        const res = await baseAxios.delete(`${TIME_API.delete_by_range}`, { ids });
        dispatch({
          type: DELETE_TIME_BY_RANGE,
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
export const toggleTimeSidebar = condition => dispatch => {
  dispatch({
    type: TOGGLE_TIME_SIDEBAR,
    payload: condition
  });
};

//Toggle Status
export const toggleTimeStatus = condition => dispatch => {
  dispatch({
    type: TOGGLE_TIME_STATUS,
    payload: condition
  });
};
/** Change Log
 * 11-Jan-2022(Iqbal): Create Function/Method deleteTIMEByRange, deleteTIME, updateTIME, addTIME, fetchTIMEsByQuery, fetchTIMEById
 */
