/*
     Title: Actions for ASSIGN_TARGET
     Description: Actions for ASSIGN_TARGET
     Author: Iqbal Hossain
     Date: 27-January-2022
     Modified: 27-January-2022 
*/

import { baseAxios } from 'services';
import { ASSIGN_TARGET_API } from 'services/api-end-points/production/v1';
import { notify } from 'utility/custom/notifications';
import {
  FETCH_ASSIGN_TARGET,
  FETCH_ASSIGN_TARGET_BY_QUERY,
  SET_ASSIGN_TARGET_BY_RANGE
} from './actionType';

export const fetchAssignTarget = () => async dispatch => {
  const response = await baseAxios.get(`${ASSIGN_TARGET_API.fetch_all}`);
  dispatch({
    type: FETCH_ASSIGN_TARGET,
    payload: response.data
  });
};

//Get Data by Query
export const fetchAssignTargetByQuery = params => {
  return async dispatch => {
    try {
      const res = await baseAxios.get(`${ASSIGN_TARGET_API.fetch_by_query}`, params);
      dispatch({
        type: FETCH_ASSIGN_TARGET_BY_QUERY,
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

//Get by Range
export const setAssignTargetByRange = (ids, target) => {
  return async dispatch => {
    try {
      const res = await baseAxios.post(`${ASSIGN_TARGET_API.get_by_range}`, { ids, target });
      dispatch({
        type: SET_ASSIGN_TARGET_BY_RANGE,
        payload: res.data.data
      });
      notify('success', res.data.message);
    } catch (err) {
      notify('error', 'Something went wrong!!! Please tyr again');
    }
  };
};

/** Change Log
 * 27-Jan-2022(Iqbal): Create Function/Method fetchASSIGN_TARGET, fetchASSIGN_TARGETsByQuery
 */
