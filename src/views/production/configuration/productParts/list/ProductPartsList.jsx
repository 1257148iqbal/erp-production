/**
 * Title: Product Parts List Page
 * Description: Product Parts List Page
 * Author: Nasir Ahmed
 * Date: 09-January-2022
 * Modified: 09-January-2022
 **/

import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDown, XSquare } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Input, Row } from 'reactstrap';
import { store } from 'redux/storeConfig/store';
import CustomPreLoader from 'utility/custom/CustomPreLoader';
import CustomPagination from 'utility/custom/production/CustomPagination';
import { PlusIcon } from 'utility/custom/production/icons/CustomIcons';
import TableCustomerHeader from 'utility/custom/TableCustomerHeader';
import { selectThemeColors } from 'utility/Utils';
import ProductPartsAddForm from '../form/ProductPartsAddForm';
import ProductPartsEditForm from '../form/ProductPartsEditForm';
import {
  deleteProductPartByRange,
  fetchProductPartsByQuery,
  toggleProductPartSidebar
} from '../store/actions';
import { productPartTableColumn } from './productPartsTableColumn';

// Status filter options
const statusOptions = [
  { value: '', label: 'Select Status', number: 0 },
  { value: true, label: 'Active', number: 1 },
  { value: false, label: 'Inactive', number: 2 }
];

const ProductPartsList = () => {
  const dispatch = useDispatch();
  const { items, isOpenSidebar, total, selectedItem } = useSelector(
    ({ productPartReducer }) => productPartReducer
  );

  //#region States
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRowId, setSelectedRowId] = useState([]);
  const [clearSelectedRow, setClearSelectedRow] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentStatus, setCurrentStatus] = useState({
    value: '',
    label: 'Select Status',
    number: 0
  });

  //#endregion

  //Global Function to toggle Sidebar
  const toggleSidebar = () => store.dispatch(toggleProductPartSidebar(!isOpenSidebar));

  //#region Effects
  useEffect(() => {
    dispatch(fetchProductPartsByQuery({ page: currentPage, rowsPerPage }));
  }, [dispatch, rowsPerPage, currentPage]);
  //#endregion

  //#region Events
  // Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  // ** Start For Multiple Rows for Get IDs
  const handleRowSelected = rows => {
    const rowsId = rows.selectedRows.map(item => item.id);
    setSelectedRowId(rowsId);
    setClearSelectedRow(false);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val);
    dispatch(fetchProductPartsByQuery({ q: val, rowsPerPage, page: currentPage }));
  };

  const handleSort = (column, direction) => {
    const { selector } = column;
    dispatch(fetchProductPartsByQuery({ sortedBy: direction, sortedColumn: selector }));
  };

  // **Clear Delete Ids
  const handleClearSelected = () => {
    setClearSelectedRow(true);
  };

  // ** Delete Rang
  const handleDeleteByRange = () => {
    dispatch(deleteProductPartByRange(selectedRowId));
    setSelectedRowId([]);
    handleClearSelected();
  };
  //#endregion

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Search Filter</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="6">
              <Input
                id="search-item"
                className="w-100 mt-50"
                placeholder="Search"
                type="text"
                value={searchTerm}
                onChange={e => handleFilter(e.target.value)}
              />
            </Col>

            <Col md="6">
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select  mt-50"
                classNamePrefix="select"
                options={statusOptions}
                value={currentStatus}
                onChange={data => {
                  setCurrentStatus(data);
                  dispatch(
                    fetchProductPartsByQuery({
                      page: currentPage,
                      rowsPerPage,
                      status: data.value ? 'active' : 'inactive'
                    })
                  );
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle tag="h2">Product Parts</CardTitle>
        </CardHeader>
        <TableCustomerHeader
          handlePerPage={handlePerPage}
          rowsPerPage={rowsPerPage}
          searchTerm={searchTerm}
        >
          <PlusIcon onClick={toggleSidebar} />
        </TableCustomerHeader>

        <DataTable
          onSelectedRowsChange={handleRowSelected}
          onSort={handleSort}
          progressPending={!items.length}
          progressComponent={<CustomPreLoader />}
          contextActions={
            <Button.Ripple onClick={handleDeleteByRange} className="btn-icon " color="flat-danger">
              <XSquare size={24} />
            </Button.Ripple>
          }
          dense
          subHeader={false}
          highlightOnHover
          selectableRows
          clearSelectedRows={clearSelectedRow}
          responsive={true}
          paginationServer
          expandableRows
          expandOnRowClicked
          persistTableHead
          columns={productPartTableColumn}
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          data={items}
        />
        <CustomPagination
          count={Number(Math.ceil(total / rowsPerPage))}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Card>

      {selectedItem !== null && isOpenSidebar ? (
        <ProductPartsEditForm
          data={selectedItem}
          open={isOpenSidebar}
          lastPageInfo={{ page: currentPage, rowsPerPage, total }}
        />
      ) : isOpenSidebar ? (
        <ProductPartsAddForm
          open={isOpenSidebar}
          lastPageInfo={{ page: currentPage, rowsPerPage, total }}
        />
      ) : null}
    </div>
  );
};

export default ProductPartsList;
