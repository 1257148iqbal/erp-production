/*
     Title: Actions for SEWING_INSPECTION
     Description: Actions for SEWING_INSPECTION
     Author: Iqbal Hossain
     Date: 29-January-2022
     Modified: 29-January-2022
*/

import { baseAxios } from 'services';
import { SEWING_INSPECTION_API } from 'services/api-end-points/production/v1';
import { notify } from 'utility/custom/notifications';
import { FETCH_SEWING_INSPECTION, FETCH_SEWING_INSPECTION_BY_QUERY } from './actionType';

export const fetchSewingInspection = () => async dispatch => {
  const response = await baseAxios.get(`${SEWING_INSPECTION_API.fetch_all}`);
  dispatch({
    type: FETCH_SEWING_INSPECTION,
    payload: response.data
  });
};

//Get Data by Query
export const fetchSewingInspectionsByQuery = params => {
  return async dispatch => {
    try {
      const res = await baseAxios.get(`${SEWING_INSPECTION_API.fetch_by_query}`, params);
      dispatch({
        type: FETCH_SEWING_INSPECTION_BY_QUERY,
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
 * 29-Jan-2022(Iqbal): Create Function/Method fetchCutPlan, fetchCutPlansByQuery
 */
