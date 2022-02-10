/*
     Title: Actions for ASSIGN_INPUT_TABLE
     Description: Actions for ASSIGN_INPUT_TABLE
     Author: Iqbal Hossain
     Date: 24-January-2022
     Modified: 24-January-2022
*/

import { baseAxios } from 'services';
import { ASSIGN_INPUT_TABLE_API } from 'services/api-end-points/production/v1';
import { confirmDialog } from 'utility/custom/ConfirmDialog';
import { notify } from 'utility/custom/notifications';
import { confirmObj } from 'utility/enums';
import {
  FETCH_ASSIGN_INPUT_TABLE,
  FETCH_ASSIGN_INPUT_TABLE_BY_QUERY,
  FETCH_ASSIGN_INPUT_TABLE_BY_RANGE
} from './actionType';

export const fetchAssignInputTable = () => async dispatch => {
  const response = await baseAxios.get(`${ASSIGN_INPUT_TABLE_API.fetch_all}`);
  dispatch({
    type: FETCH_ASSIGN_INPUT_TABLE,
    payload: response.data
  });
};

//Get Data by Query
export const fetchAssignInputTableByQuery = params => {
  return async dispatch => {
    try {
      const res = await baseAxios.get(`${ASSIGN_INPUT_TABLE_API.fetch_by_query}`, params);
      dispatch({
        type: FETCH_ASSIGN_INPUT_TABLE_BY_QUERY,
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
export const fetchAssignInputTableByRange = ids => {
  return async dispatch => {
    const e = await confirmDialog(confirmObj);
    if (e.isConfirmed) {
      try {
        const res = await baseAxios.get(`${ASSIGN_INPUT_TABLE_API.get_by_range}`, { ids });
        dispatch({
          type: FETCH_ASSIGN_INPUT_TABLE_BY_RANGE,
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
 * 24-Jan-2022(Iqbal): Create Function/Method fetchASSIGN_INPUT_TABLE, fetchASSIGN_INPUT_TABLEsByQuery
 */
