/*
     Title: Actions for CUT_PLAN
     Description: Actions for CUT_PLAN
     Author: Iqbal Hossain
     Date: 18-January-2022
     Modified: 18-January-2022
*/

import { baseAxios } from 'services';
import { CUT_PLAN_API } from 'services/api-end-points/production/v1';
import { confirmDialog } from 'utility/custom/ConfirmDialog';
import { notify } from 'utility/custom/notifications';
import { confirmObj } from 'utility/enums';
import {
  DELETE_CUT_PLAN,
  DELETE_CUT_PLAN_BY_RANGE,
  FETCH_CUT_PLAN,
  FETCH_CUT_PLAN_BY_QUERY
} from './actionType';

export const fetchCutPlan = () => async dispatch => {
  const response = await baseAxios.get(`${CUT_PLAN_API.fetch_all}`);
  dispatch({
    type: FETCH_CUT_PLAN,
    payload: response.data
  });
};

//Get Data by Query
export const fetchCutPlansByQuery = params => {
  return async dispatch => {
    try {
      const res = await baseAxios.get(`${CUT_PLAN_API.fetch_by_query}`, params);
      dispatch({
        type: FETCH_CUT_PLAN_BY_QUERY,
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

//Delete
export const deleteCutPlan = id => {
  return async dispatch => {
    const e = await confirmDialog(confirmObj);
    if (e.isConfirmed) {
      try {
        const res = await baseAxios.delete(`${CUT_PLAN_API.delete}`, { id });
        dispatch({
          type: DELETE_CUT_PLAN,
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
export const deleteCutPlanByRange = ids => {
  return async dispatch => {
    const e = await confirmDialog(confirmObj);
    if (e.isConfirmed) {
      try {
        const res = await baseAxios.delete(`${CUT_PLAN_API.delete_by_range}`, { ids });
        dispatch({
          type: DELETE_CUT_PLAN_BY_RANGE,
          payload: res.data.data
        });
        notify('success', res.data.message);
      } catch (err) {
        notify('error', 'Something went wrong!!! Please tyr again');
      }
    }
  };
};

/** Change Log
 * 18-Jan-2022(Iqbal): Create Function/Method fetchCutPlan, fetchCutPlansByQuery
 */
