/**
 * Title: Action Creator for Critical Process
 * Description: Action Creator for Critical Process
 * Author: Nasir Ahmed
 * Date: 10-January-2022
 * Modified: 10-January-2022
 **/

import { baseAxios } from 'services';
import { CRITICAL_PROCESS_API } from 'services/api-end-points/production/v1';
import { confirmDialog } from 'utility/custom/ConfirmDialog';
import { notify } from 'utility/custom/notifications';
import { confirmObj } from 'utility/enums';
import {
  ADD_CRITICAL_PROCESS,
  DELETE_CRITICAL_PROCESS,
  DELETE_CRITICAL_PROCESS_BY_RANGE,
  FETCH_CRITICAL_PROCESS,
  FETCH_CRITICAL_PROCESS_BY_ID,
  FETCH_CRITICAL_PROCESS_BY_QUERY,
  TOGGLE_CRITICAL_PROCESS_SIDEBAR,
  TOGGLE_CRITICAL_PROCESS_STATUS,
  UPDATE_CRITICAL_PROCESS
} from './actionType';

export const fetchCriticalProcess = () => async dispatch => {
  const response = await baseAxios.get(`${CRITICAL_PROCESS_API.fetch_all}`);
  dispatch({
    type: FETCH_CRITICAL_PROCESS,
    payload: response.data
  });
};

//Get Data by Query
export const fetchCriticalProcessByQuery = params => {
  return async dispatch => {
    try {
      const res = await baseAxios.get(`${CRITICAL_PROCESS_API.fetch_by_query}`, params);
      dispatch({
        type: FETCH_CRITICAL_PROCESS_BY_QUERY,
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
export const fetchCriticalProcessById = id => {
  return async dispatch => {
    try {
      const res = await baseAxios.get(`${CRITICAL_PROCESS_API.fetch_by_id}`, { id });
      dispatch({
        type: FETCH_CRITICAL_PROCESS_BY_ID,
        payload: {
          selectedItem: res.data.data
        }
      });
    } catch (err) {
      notify('error', 'Something went wrong!!! Please try again');
    }
  };
};

//Add new
export const addCriticalProcess = (data, params) => {
  return async dispatch => {
    try {
      const res = await baseAxios.post(`${CRITICAL_PROCESS_API.add}`, data);
      dispatch({
        type: ADD_CRITICAL_PROCESS,
        payload: data
      });
      notify('success', res.data.message);
      dispatch(fetchCriticalProcessByQuery(params));
    } catch (err) {
      notify('error', 'Something went wrong!!! Please try again');
    }
  };
};

//Update
export const updateCriticalProcess = (data, params) => {
  // console.log(data);
  return async dispatch => {
    try {
      const res = await baseAxios.post(`${CRITICAL_PROCESS_API.update}`, { data });
      dispatch({
        type: UPDATE_CRITICAL_PROCESS,
        payload: data
      });
      notify('success', res.data.message);
      dispatch(fetchCriticalProcessByQuery(params));
    } catch (err) {
      notify('error', 'Something went wrong!!! Please try again');
    }
  };
};

//Delete
export const deleteCriticalProcess = id => {
  return async dispatch => {
    const e = await confirmDialog(confirmObj);
    if (e.isConfirmed) {
      try {
        const res = await baseAxios.delete(`${CRITICAL_PROCESS_API.delete}`, { id });
        dispatch({
          type: DELETE_CRITICAL_PROCESS,
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
export const deleteCriticalProcessByRange = ids => {
  return async dispatch => {
    const e = await confirmDialog(confirmObj);
    if (e.isConfirmed) {
      try {
        const res = await baseAxios.delete(`${CRITICAL_PROCESS_API.delete_by_range}`, { ids });
        dispatch({
          type: DELETE_CRITICAL_PROCESS_BY_RANGE,
          payload: res.data.data
        });
        notify('success', res.data.message);
      } catch (err) {
        notify('error', 'Something went wrong!!! Please tyr again');
      }
    }
  };
};

//Toggle Sidebar
export const toggleCritcalProcessSidebar = condition => dispatch => {
  dispatch({
    type: TOGGLE_CRITICAL_PROCESS_SIDEBAR,
    payload: condition
  });
};

//Toggle Status
export const toggleCritcalProcessStatus = status => dispatch => {
  dispatch({
    type: TOGGLE_CRITICAL_PROCESS_STATUS,
    payload: status
  });
};

/** Change Log
 * 12-Jan-2022: add toggleCritcalProcessStatus for status change
 */
