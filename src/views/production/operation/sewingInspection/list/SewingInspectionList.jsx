/**
 * Title: Sewing Inspection List
 * Description: Sewing Inspection List
 * Author: Iqbal Hossain
 * Date: 27-January-2022
 * Modified: 27-January-2022
 */

import '@custom-styles/merchandising/others/custom-table.scss';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDown, Eye, Settings } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, CardTitle, Col, Input, Row } from 'reactstrap';
import CustomPreLoader from 'utility/custom/CustomPreLoader';
import CustomPagination from 'utility/custom/production/CustomPagination';
import TableCustomerHeader from 'utility/custom/TableCustomerHeader';
import { fetchSewingInspectionsByQuery } from '../store/actions';
import SewingInspectionCriticalProcess from './SewingInspectionCriticalProcess';

const SewingInspectionListPage = () => {
  const dispatch = useDispatch();

  //#region State
  // const [hasAssignTargetDetails, setHasAssignTargetDetails] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [hasSewingInspectionCriticalProcess, setHasSewingInspectionCriticalProcess] = useState(
    false
  );
  const { items, total } = useSelector(({ sewingInspectionReducer }) => sewingInspectionReducer);

  const [state, setState] = useState([]);

  //#endregion

  //#region Effect
  useEffect(() => {
    dispatch(fetchSewingInspectionsByQuery({ page: currentPage, rowsPerPage }));
  }, [dispatch, rowsPerPage, currentPage]);
  //#endregion

  //#region Events

  const handleSettingsModalOpen = oldIdx => {
    setState(oldIdx);
    setHasSewingInspectionCriticalProcess(!hasSewingInspectionCriticalProcess);
  };

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
    dispatch(fetchSewingInspectionsByQuery({ q: val, rowsPerPage, page: currentPage }));
  };

  const handleSort = (column, direction) => {
    const { selector } = column;
    dispatch(fetchSewingInspectionsByQuery({ sortedBy: direction, sortedColumn: selector }));
  };

  // handle row multiple selection

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
            Sewing Inspection
          </CardTitle>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <TableCustomerHeader
              handlePerPage={handlePerPage}
              rowsPerPage={rowsPerPage}
              searchTerm={searchTerm}
            ></TableCustomerHeader>

            <DataTable
              onSort={handleSort}
              progressPending={!items.length}
              progressComponent={<CustomPreLoader />}
              dense
              subHeader={false}
              highlightOnHover
              responsive
              paginationServer
              expandOnRowClicked
              persistTableHead
              columns={[
                {
                  name: 'Zone Owner',
                  minWidth: '170px',
                  selector: 'zoneOwner',
                  sortable: true,
                  cell: row => row.zoneOwner
                },
                {
                  name: 'Line Number',
                  minWidth: '150px',
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
                  cell: idx => (
                    <div>
                      <Settings
                        className="cursor-pointer mr-1"
                        onClick={() => handleSettingsModalOpen(idx)}
                      ></Settings>
                      <Eye className="cursor-pointer" onClick={() => {}}></Eye>
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
      </Card>
      {hasSewingInspectionCriticalProcess && (
        <SewingInspectionCriticalProcess
          openModal={hasSewingInspectionCriticalProcess}
          setOpenModal={setHasSewingInspectionCriticalProcess}
          data={state}
        />
      )}
    </>
  );
};

export default SewingInspectionListPage;

/** Change Log
 * 29-Jan-2022 (Iqbal): Sewing Inspection List Page and Tab With data render from mock
 */
