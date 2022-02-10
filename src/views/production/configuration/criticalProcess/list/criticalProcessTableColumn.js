/**
 * Title: Table Columns for Critical Process
 * Description: Table Columns for Critical Process
 * Author: Nasir Ahmed
 * Date: 10-January-2022
 * Modified: 10-January-2022
 **/

import React from 'react';
import { Edit, FileText, MoreVertical, Trash2 } from 'react-feather';
import { Link } from 'react-router-dom';
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';
import { store } from 'redux/storeConfig/store';
import {
  deleteCriticalProcess,
  fetchCriticalProcessById,
  toggleCritcalProcessSidebar
} from '../store/actions';

const statusObj = {
  active: 'light-success',
  inactive: 'light-secondary'
};

export const criticalProcessTableColumn = [
  {
    name: 'Process Name',
    minWidth: '170px',
    selector: 'processName',
    sortable: true,
    cell: row => row.processName
  },
  {
    name: 'Process Type',
    minWidth: '150px',
    selector: 'processType',
    sortable: true,
    cell: row => row.processType
  },
  {
    name: 'Status',
    maxWidth: '120px',
    selector: 'status',
    sortable: true,
    cell: row => (
      <Badge className="text-capitalize" color={statusObj[row.status]} pill>
        {row.status}
      </Badge>
    )
  },
  {
    name: 'Actions',
    maxWidth: '100px',
    cell: row => (
      <UncontrolledDropdown>
        <DropdownToggle tag="div" className="btn btn-sm">
          <MoreVertical size={14} className="cursor-pointer" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem tag={Link} to={`item-details/${row.processName}`} className="w-100">
            <FileText color="skyBlue" size={14} className="mr-50" />
            <span color="primary" className="align-middle">
              Details
            </span>
          </DropdownItem>
          <DropdownItem
            className="w-100"
            onClick={() => {
              store.dispatch(fetchCriticalProcessById(row.id));
              store.dispatch(toggleCritcalProcessSidebar(true));
            }}
          >
            <Edit color="green" size={14} className="mr-50" />
            <span className="align-middle">Edit</span>
          </DropdownItem>
          <DropdownItem
            className="w-100"
            onClick={() => {
              store.dispatch(deleteCriticalProcess(row.id));
            }}
          >
            <Trash2 color="red" size={14} className="mr-50" />
            <span className="align-middle">Delete</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }
];
