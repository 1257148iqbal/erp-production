/*
     Title: Actions for Zone
     Description: Actions for Zone
     Author: Iqbal Hossain
     Date: 09-January-2022
     Modified: 09-January-2022
*/

import { baseAxios } from 'services';
import { ZONE_API } from 'services/api-end-points/production/v1';
import { confirmDialog } from 'utility/custom/ConfirmDialog';
import { notify } from 'utility/custom/notifications';
import { confirmObj } from 'utility/enums';
import {
  ADD_ZONE,
  DELETE_ZONE,
  DELETE_ZONE_BY_RANGE,
  FETCH_ZONE,
  FETCH_ZONE_BY_ID,
  FETCH_ZONE_BY_QUERY,
  TOGGLE_ZONE_SIDEBAR,
  TOGGLE_ZONE_STATUS,
  UPDATE_ZONE
} from './actionType';

export const fetchZone = () => async dispatch => {
  const response = await baseAxios.get(`${ZONE_API.fetch_all}`);
  dispatch({
    type: FETCH_ZONE,
    payload: response.data
  });
};

//Get Data by Query
export const fetchZonesByQuery = params => {
  return async dispatch => {
    try {
      const res = await baseAxios.get(`${ZONE_API.fetch_by_query}`, params);
      dispatch({
        type: FETCH_ZONE_BY_QUERY,
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
export const fetchZoneById = id => {
  return async dispatch => {
    try {
      const res = await baseAxios.get(`${ZONE_API.fetch_by_id}`, { id });
      dispatch({
        type: FETCH_ZONE_BY_ID,
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
export const addZone = (data, params) => {
  return async dispatch => {
    try {
      const res = await baseAxios.post(`${ZONE_API.add}`, data);
      dispatch({
        type: ADD_ZONE,
        payload: data
      });
      notify('success', res.data.message);
      dispatch(fetchZonesByQuery(params));
    } catch (err) {
      notify('error', 'Something went wrong!!! Please try again');
    }
  };
};

//Update Zone
export const updateZone = (data, params) => {
  return async dispatch => {
    try {
      const res = await baseAxios.post(`${ZONE_API.update}`, { data });
      dispatch({
        type: UPDATE_ZONE,
        payload: data
      });
      notify('success', res.data.message);
      dispatch(fetchZonesByQuery(params));
    } catch (err) {
      notify('error', 'Something went wrong!!! Please try again');
    }
  };
};

//Delete Zone
export const deleteZone = id => {
  return async dispatch => {
    const e = await confirmDialog(confirmObj);
    if (e.isConfirmed) {
      try {
        const res = await baseAxios.delete(`${ZONE_API.delete}`, { id });
        dispatch({
          type: DELETE_ZONE,
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
export const deleteZoneByRange = ids => {
  return async dispatch => {
    const e = await confirmDialog(confirmObj);
    if (e.isConfirmed) {
      try {
        const res = await baseAxios.delete(`${ZONE_API.delete_by_range}`, { ids });
        dispatch({
          type: DELETE_ZONE_BY_RANGE,
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
export const toggleZoneSidebar = condition => dispatch => {
  dispatch({
    type: TOGGLE_ZONE_SIDEBAR,
    payload: condition
  });
};

//Toggle Stutes
export const toggleZoneStatus = condition => dispatch => {
  dispatch({
    type: TOGGLE_ZONE_STATUS,
    payload: condition
  });
};

/** Change Log
 * 09-Jan-2022(Iqbal): Create Function/Method deleteZoneByRange, deleteZone, updateZone, addZone, fetchZonesByQuery, fetchZoneById
 */
