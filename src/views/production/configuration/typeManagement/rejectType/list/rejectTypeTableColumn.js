/*
   Title: RejectType Table Column
   productionProcess: RejectType Table Column
   Author: Iqbal Hossain
   Date: 10-January-2022
   Modified: 10-January-2022 
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
import { deleteRejectType, fetchRejectTypeById, toggleRejectTypeSidebar } from '../store/actions';

const statusObj = {
  active: 'light-success',
  inactive: 'light-secondary'
};

export const rejectTypeTableColumn = [
  {
    name: 'Reject Type Name',
    minWidth: '170px',
    selector: 'rejectTypeName',
    sortable: true,
    cell: row => row.rejectTypeName
  },
  {
    name: 'Production Process',
    minWidth: '150px',
    selector: 'productionProcess',
    sortable: true,
    cell: row => row.productionProcess
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
              store.dispatch(fetchRejectTypeById(row.id));
              store.dispatch(toggleRejectTypeSidebar(true));
            }}
          >
            <Edit color="green" size={14} className="mr-50" />
            <span className="align-middle">Edit</span>
          </DropdownItem>
          <DropdownItem
            className="w-100"
            onClick={() => {
              store.dispatch(deleteRejectType(row.id));
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
