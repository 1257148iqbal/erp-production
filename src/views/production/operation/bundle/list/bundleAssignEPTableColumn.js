/*
     Title: Bundle Table Column
     startDate: Bundle Table Column
     Author: Iqbal Hossain
     Date: 18-January-2022
     Modified: 18-January-2022
*/

import React from 'react';
import { Eye } from 'react-feather';

export const bundleAssingEPTableColumn = [
  {
    name: 'Cut Plan No',
    minWidth: '170px',
    selector: 'cutPlanNo',
    sortable: true,
    cell: row => row.cutPlanNo
  },
  {
    name: 'Bundle Number',
    minWidth: '150px',
    selector: 'bundleNumber',
    sortable: true,
    cell: row => row.bundleNumber
  },
  {
    name: 'Date',
    minWidth: '150px',
    selector: 'date',
    sortable: true,
    cell: row => row.date
  },
  {
    name: 'Serial Start',
    minWidth: '150px',
    selector: 'serialStart',
    sortable: true,
    cell: row => row.serialStart
  },
  {
    name: 'Serial End',
    minWidth: '150px',
    selector: 'serialEnd',
    sortable: true,
    cell: row => row.serialEnd
  },
  {
    name: 'Quantity',
    minWidth: '150px',
    selector: 'quantity',
    sortable: true,
    cell: row => row.quantity
  },
  {
    name: 'Checked Date',
    minWidth: '150px',
    selector: 'checkedDate',
    sortable: true,
    cell: row => row.checkedDate
  },
  {
    name: 'Damage Info',
    maxWidth: '120px',
    selector: 'damageInfo',
    sortable: true,
    cell: row => <Eye>{row.damageInfo}</Eye>
  },
  {
    name: 'Status',
    minWidth: '150px',
    selector: 'status',
    sortable: true,
    cell: row => row.status
  }
];

export const bundleAssingSewingTableColumn = [
  {
    name: 'Cut Plan No',
    minWidth: '170px',
    selector: 'cutPlanNo',
    sortable: true,
    cell: row => row.cutPlanNo
  },
  {
    name: 'Color',
    minWidth: '150px',
    selector: 'color',
    sortable: true,
    cell: row => row.color
  },
  {
    name: 'Combo Info',
    minWidth: '150px',
    selector: 'comboInfo',
    sortable: true,
    cell: row => row.comboInfo
  },
  {
    name: 'Parts',
    minWidth: '150px',
    selector: 'parts',
    sortable: true,
    cell: row => row.parts
  },
  {
    name: 'Serial Start',
    minWidth: '150px',
    selector: 'serialStart',
    sortable: true,
    cell: row => row.serialStart
  },
  {
    name: 'Serial End',
    minWidth: '150px',
    selector: 'serialEnd',
    sortable: true,
    cell: row => row.serialEnd
  },
  {
    name: 'Quantity',
    minWidth: '150px',
    selector: 'quantity',
    sortable: true,
    cell: row => row.quantity
  }
];
