/*
     Title: Actions for PANEL_CHECK
     Description: Actions for PANEL_CHECK
     Author: Iqbal Hossain
     Date: 22-January-2022
     Modified: 22-January-2022
*/

import { baseAxios } from 'services';
import { PANEL_CHECK_API } from 'services/api-end-points/production/v1';
import { notify } from 'utility/custom/notifications';
import { FETCH_PANEL_CHECK, FETCH_PANEL_CHECK_BY_QUERY } from './actionType';

export const fetchPanelCheck = () => async dispatch => {
  const response = await baseAxios.get(`${PANEL_CHECK_API.fetch_all}`);
  dispatch({
    type: FETCH_PANEL_CHECK,
    payload: response.data
  });
};

//Get Data by Query
export const fetchPanelChecksByQuery = params => {
  return async dispatch => {
    try {
      const res = await baseAxios.get(`${PANEL_CHECK_API.fetch_by_query}`, params);
      dispatch({
        type: FETCH_PANEL_CHECK_BY_QUERY,
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

/** Change Log
 * 22-Jan-2022(Iqbal): Create Function/Method fetchCutPlan, fetchCutPlansByQuery
 */
