/**
 * Title: Assign Target List
 * Description: Assign Target List
 * Author: Iqbal Hossain
 * Date: 27-January-2022
 * Modified: 27-January-2022
 */

import '@custom-styles/merchandising/others/custom-table.scss';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDown, Eye, Menu } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Input, Row } from 'reactstrap';
import CustomPreLoader from 'utility/custom/CustomPreLoader';
import CustomPagination from 'utility/custom/production/CustomPagination';
import TableCustomerHeader from 'utility/custom/TableCustomerHeader';
import AssingTargetDetails from '../details/AssignTargetDetails';
import { fetchAssignTargetByQuery } from '../store/actions';
import AssignTargetActionPage from './AssignTargetActionPage';
const AssingTargetListPage = () => {
  const dispatch = useDispatch();

  //#region State
  const [hasAssignTargetAction, setHasAssignTargetAction] = useState(false);
  const [hasAssignTargetDetails, setHasAssignTargetDetails] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [clearSelectedRow, setClearSelectedRow] = useState(false);

  // const [assignTarget] = React.useState([
  //   {
  //     id: randomIdGenerator(),
  //     lineNumber: 'Line 01',
  //     noOfMachine: 25,
  //     target: 250,
  //     status: 'Active',
  //     details: ''
  //   },
  //   {
  //     id: randomIdGenerator(),
  //     lineNumber: 'Line 02',
  //     noOfMachine: 25,
  //     target: 450,
  //     status: 'Active',
  //     details: ''
  //   },
  //   {
  //     id: randomIdGenerator(),
  //     lineNumber: 'Line 03, Line 04',
  //     noOfMachine: 25,
  //     target: 800,
  //     status: 'Active',
  //     details: ''
  //   },
  //   {
  //     id: randomIdGenerator(),
  //     lineNumber: 'Line 05',
  //     noOfMachine: 25,
  //     target: 250,
  //     status: 'Active',
  //     details: ''
  //   },
  //   {
  //     id: randomIdGenerator(),
  //     lineNumber: 'Line 06',
  //     noOfMachine: 25,
  //     target: 250,
  //     status: 'Active',
  //     details: ''
  //   },
  //   {
  //     id: randomIdGenerator(),
  //     lineNumber: 'Line 07',
  //     noOfMachine: 25,
  //     target: 250,
  //     status: 'Active',
  //     details: ''
  //   },
  //   {
  //     id: randomIdGenerator(),
  //     lineNumber: 'Line 08',
  //     noOfMachine: 25,
  //     target: 250,
  //     status: 'Active',
  //     details: ''
  //   }
  // ]);
  //#endregion

  const { items, total } = useSelector(({ assignTargetReducer }) => assignTargetReducer);

  //#region Effect
  useEffect(() => {
    dispatch(fetchAssignTargetByQuery({ page: currentPage, rowsPerPage }));
  }, [dispatch, rowsPerPage, currentPage]);
  //#endregion

  //#region Events

  // Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val);
    dispatch(fetchAssignTargetByQuery({ q: val, rowsPerPage, page: currentPage }));
  };

  const handleSort = (column, direction) => {
    const { selector } = column;
    dispatch(fetchAssignTargetByQuery({ sortedBy: direction, sortedColumn: selector }));
  };

  // handle row multiple selection
  const handleMultipleRowSelection = rows => {
    const rowIds = rows.selectedRows.map(item => item.id);
    setSelectedRowIds(rowIds);
    setClearSelectedRow(false);
  };

  //handle take action
  const handleTakeAction = () => {
    // dispatch(setAssignTargetByRange(selectedRowIds));
    setHasAssignTargetAction(!hasAssignTargetAction);
  };

  //#endregion

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Search Filter</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="12">
              <Input
                id="search-item"
                className="w-100 mt-50"
                placeholder="Search"
                type="text"
                value={searchTerm}
                onChange={e => handleFilter(e.target.value)}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card>
        <Row className="rounded rounded-3 p-1">
          <CardTitle tag="h2" className="ml-2 mt-1">
            Assign Target
          </CardTitle>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <TableCustomerHeader
              handlePerPage={handlePerPage}
              rowsPerPage={rowsPerPage}
              searchTerm={searchTerm}
            ></TableCustomerHeader>

            <DataTable
              onSelectedRowsChange={handleMultipleRowSelection}
              onSort={handleSort}
              progressPending={!items.length}
              progressComponent={<CustomPreLoader />}
              contextActions={
                <Button.Ripple className="btn-icon " color="flat-primary">
                  <Menu size={24} onClick={handleTakeAction} />
                </Button.Ripple>
              }
              dense
              subHeader={false}
              highlightOnHover
              clearSelectedRows={clearSelectedRow}
              selectableRows
              responsive
              paginationServer
              expandOnRowClicked
              persistTableHead
              columns={[
                {
                  name: 'Line Number',
                  minWidth: '170px',
                  selector: 'lineNumber',
                  sortable: true,
                  cell: row => row.lineNumber
                },
                {
                  name: 'No Of Machine',
                  minWidth: '150px',
                  selector: 'noOfMachine',
                  sortable: true,
                  cell: row => row.noOfMachine
                },
                {
                  name: 'Target',
                  minWidth: '150px',
                  selector: 'target',
                  sortable: true,
                  cell: row => row.target
                },
                {
                  name: 'Status',
                  minWidth: '150px',
                  selector: 'status',
                  sortable: true,
                  cell: row => row.status
                },
                {
                  name: 'Manage',
                  minWidth: '150px',
                  selector: 'manage',
                  sortable: true,
                  cell: () => (
                    <div>
                      <Eye
                        className="cursor-pointer"
                        onClick={() => setHasAssignTargetDetails(!hasAssignTargetDetails)}
                      ></Eye>
                    </div>
                  )
                }
              ]}
              sortIcon={<ChevronDown />}
              className="react-dataTable"
              data={items}
            />
          </Col>
        </Row>
        <CustomPagination
          count={Number(Math.ceil(total / rowsPerPage))}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />

        {hasAssignTargetAction && (
          <AssignTargetActionPage
            openModal={hasAssignTargetAction}
            setOpenModal={setHasAssignTargetAction}
            selectedRowIds={selectedRowIds}
          />
        )}
        {hasAssignTargetDetails && (
          <AssingTargetDetails
            openModal={hasAssignTargetDetails}
            setOpenModal={setHasAssignTargetDetails}
            data={items}
          />
        )}
      </Card>
    </>
  );
};

export default AssingTargetListPage;

/** Change Log
 * 27-Jan-2022 (Iqbal): Assign Target List Page and Tab With data render from mock
 */
