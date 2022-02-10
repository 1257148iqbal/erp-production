/*
     Title: Time Table Column
     formTime: Time Table Column
     Author: Iqbal Hossain
     Date: 11-January-2022
     Modified: 11-January-2022
*/

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
import { deleteTime, fetchTimeById, toggleTimeSidebar } from '../store/actions';

const statusObj = {
  active: 'light-success',
  inactive: 'light-secondary'
};

export const timeTableColumn = [
  {
    name: 'Name',
    minWidth: '170px',
    selector: 'name',
    sortable: true,
    cell: row => row.name
  },
  {
    name: 'From Time',
    minWidth: '150px',
    selector: 'fromTime',
    sortable: true,
    cell: row => row.fromTime
  },
  {
    name: 'To Time',
    minWidth: '150px',
    selector: 'toTime',
    sortable: true,
    cell: row => row.toTime
  },
  {
    name: 'Duration',
    minWidth: '150px',
    selector: 'duration',
    sortable: true,
    cell: row => row.duration
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
          <DropdownItem tag={Link} to={`item-details/${row.name}`} className="w-100">
            <FileText color="skyBlue" size={14} className="mr-50" />
            <span color="primary" className="align-middle">
              Details
            </span>
          </DropdownItem>
          <DropdownItem
            className="w-100"
            onClick={() => {
              store.dispatch(fetchTimeById(row.id));
              store.dispatch(toggleTimeSidebar(true));
            }}
          >
            <Edit color="green" size={14} className="mr-50" />
            <span className="align-middle">Edit</span>
          </DropdownItem>
          <DropdownItem
            className="w-100"
            onClick={() => {
              store.dispatch(deleteTime(row.id));
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
