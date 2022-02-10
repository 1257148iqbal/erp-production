/*
     Title: Actions for BUNDLE
     Description: Actions for BUNDLE
     Author: Iqbal Hossain
     Date: 23-January-2022
     Modified: 23-January-2022
*/

import { baseAxios } from 'services';
import { BUNDLE_API } from 'services/api-end-points/production/v1';
import { confirmDialog } from 'utility/custom/ConfirmDialog';
import { notify } from 'utility/custom/notifications';
import { confirmObj } from 'utility/enums';
import { FETCH_BUNDLE, FETCH_BUNDLE_BY_QUERY, FETCH_BUNDLE_BY_RANGE } from './actionType';

export const fetchBundle = () => async dispatch => {
  const response = await baseAxios.get(`${BUNDLE_API.fetch_all}`);
  dispatch({
    type: FETCH_BUNDLE,
    payload: response.data
  });
};

//Get Data by Query
export const fetchBundlesByQuery = params => {
  return async dispatch => {
    try {
      const res = await baseAxios.get(`${BUNDLE_API.fetch_by_query}`, params);
      dispatch({
        type: FETCH_BUNDLE_BY_QUERY,
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
export const fetchBundleByRange = ids => {
  return async dispatch => {
    const e = await confirmDialog(confirmObj);
    if (e.isConfirmed) {
      try {
        const res = await baseAxios.get(`${BUNDLE_API.get_by_range}`, { ids });
        dispatch({
          type: FETCH_BUNDLE_BY_RANGE,
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
 * 23-Jan-2022(Iqbal): Create Function/Method fetchBundle, fetchBundlesByQuery
 */
