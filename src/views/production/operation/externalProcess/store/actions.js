/*
     Title: Actions for EXTERNAL_PROCESS
     Description: Actions for EXTERNAL_PROCESS
     Author: Iqbal Hossain
     Date: 24-January-2022
     Modified: 24-January-2022
*/

import { baseAxios } from 'services';
import { EXTERNAL_PROCESS_API } from 'services/api-end-points/production/v1';
import { confirmDialog } from 'utility/custom/ConfirmDialog';
import { notify } from 'utility/custom/notifications';
import { confirmObj } from 'utility/enums';
import {
  FETCH_EXTERNAL_PROCESS,
  FETCH_EXTERNAL_PROCESS_BY_QUERY,
  FETCH_EXTERNAL_PROCESS_BY_RANGE
} from './actionType';

export const fetchExternalProcess = () => async dispatch => {
  const response = await baseAxios.get(`${EXTERNAL_PROCESS_API.fetch_all}`);
  dispatch({
    type: FETCH_EXTERNAL_PROCESS,
    payload: response.data
  });
};

//Get Data by Query
export const fetchExternalProcessByQuery = params => {
  return async dispatch => {
    try {
      const res = await baseAxios.get(`${EXTERNAL_PROCESS_API.fetch_by_query}`, params);
      dispatch({
        type: FETCH_EXTERNAL_PROCESS_BY_QUERY,
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
export const fetchExternalProcessByRange = ids => {
  return async dispatch => {
    const e = await confirmDialog(confirmObj);
    if (e.isConfirmed) {
      try {
        const res = await baseAxios.get(`${EXTERNAL_PROCESS_API.get_by_range}`, { ids });
        dispatch({
          type: FETCH_EXTERNAL_PROCESS_BY_RANGE,
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
 * 24-Jan-2022(Iqbal): Create Function/Method fetchEXTERNAL_PROCESS, fetchEXTERNAL_PROCESSsByQuery
 */
