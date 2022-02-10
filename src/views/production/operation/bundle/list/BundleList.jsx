/**
 * Title: Bundle Edit Form
 * Description: Bundle Edit Form
 * Author: Iqbal Hossain
 * Date: 05-January-2022
 * Modified: 05-January-2022
 */

import '@custom-styles/merchandising/others/custom-table.scss';
import { assignEPData } from '@fake-db/production/operation/bundleMock';
import React, { Fragment, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDown, Eye, Maximize2, Menu, Minimize2 } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Collapse,
  CustomInput,
  FormGroup,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  Table,
  TabPane
} from 'reactstrap';
import CustomPreLoader from 'utility/custom/CustomPreLoader';
import CustomPagination from 'utility/custom/production/CustomPagination';
import TableCustomerHeader from 'utility/custom/TableCustomerHeader';
import { randomIdGenerator } from 'utility/Utils';
import BundleAssignEPRejectInfo from '../details/BundleAssignEPRejectInfo';
import { fetchBundlesByQuery } from '../store/actions';
import classes from '../style/BundleList.module.scss';
import BundleAssignedSewing from './BundleAssignedSewing';
import {
  bundleAssingEPTableColumn,
  bundleAssingSewingTableColumn
} from './bundleAssignEPTableColumn';
const BundleListPage = () => {
  const dispatch = useDispatch();

  //#region State
  const [active, setActive] = useState('1');
  const [openModal, setOpenModal] = useState(false);
  const [hasDamageInfo, setHasDamageInfo] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [bundle, setBundle] = React.useState([
    {
      id: randomIdGenerator(),
      cutPlanNo: 'CP001',
      buyer: 'Kuper',
      style: 'AV56567',
      po: 'PO 01',
      styleCategory: 'T-Shirt',
      color: 'Red',
      shipmentDate: '10-11-2021',
      shipmentMode: 'Air',
      destination: 'Africa',
      quantity: 2520,
      isOpen: false,
      details: [
        {
          id: randomIdGenerator(),
          bundleNumber: '45-M-01-F',
          date: '23/11/2021',
          serialStart: 1,
          serialEnd: 25,
          quantity: 25,
          isChecked: false,
          checkedDate: '23/11/2021',
          status: 'Passed',
          damageInfo: ''
        },
        {
          id: randomIdGenerator(),
          bundleNumber: '45-M-01-B',
          date: '23/11/2021',
          serialStart: 1,
          serialEnd: 25,
          quantity: 25,
          isChecked: false,
          checkedDate: '23/11/2021',
          status: 'Passed',
          damageInfo: ''
        },
        {
          id: randomIdGenerator(),
          bundleNumber: '45-M-01-PO',
          date: '23/11/2021',
          serialStart: 1,
          serialEnd: 25,
          quantity: 25,
          isChecked: false,
          checkedDate: '23/11/2021',
          status: 'Passed',
          damageInfo: ''
        },
        {
          id: randomIdGenerator(),
          bundleNumber: '45-M-01-Cuff',
          date: '23/11/2021',
          serialStart: 1,
          serialEnd: 25,
          quantity: 25,
          isChecked: false,
          checkedDate: '23/11/2021',
          status: 'Passed',
          damageInfo: ''
        }
      ]
    },
    {
      id: randomIdGenerator(),
      cutPlanNo: 'CP002',
      buyer: 'IFG',
      style: 'AV1873',
      po: 'PO 02',
      styleCategory: 'Shorts',
      color: 'Red',
      shipmentDate: '10-11-2021',
      shipmentMode: 'Sea',
      destination: 'Canada',
      quantity: 2520,
      isOpen: false,
      details: [
        {
          id: randomIdGenerator(),
          bundleNumber: '45-M-01-F',
          date: '23/11/2021',
          serialStart: 1,
          serialEnd: 25,
          quantity: 25,
          isChecked: false,
          checkedDate: '23/11/2021',
          status: 'Passed',
          damageInfo: ''
        },
        {
          id: randomIdGenerator(),
          bundleNumber: '45-M-01-B',
          date: '23/11/2021',
          serialStart: 1,
          serialEnd: 25,
          quantity: 25,
          isChecked: false,
          checkedDate: '23/11/2021',
          status: 'Passed',
          damageInfo: ''
        },
        {
          id: randomIdGenerator(),
          bundleNumber: '45-M-01-PO',
          date: '23/11/2021',
          serialStart: 1,
          serialEnd: 25,
          quantity: 25,
          isChecked: false,
          checkedDate: '23/11/2021',
          status: 'Passed',
          damageInfo: ''
        },
        {
          id: randomIdGenerator(),
          bundleNumber: '45-M-01-Cuff',
          date: '23/11/2021',
          serialStart: 1,
          serialEnd: 25,
          quantity: 25,
          isChecked: false,
          checkedDate: '23/11/2021',
          status: 'Passed',
          damageInfo: ''
        }
      ]
    },
    {
      id: randomIdGenerator(),
      cutPlanNo: 'CP003',
      buyer: 'RICHLU',
      style: 'M7825',
      po: 'PO 03',
      styleCategory: 'Jeans',
      color: 'Red',
      shipmentDate: '13-11-2021',
      shipmentMode: 'Bus',
      destination: 'India',
      quantity: 2520,
      isOpen: false,
      details: [
        {
          id: randomIdGenerator(),
          bundleNumber: '45-M-01-F',
          date: '23/11/2021',
          serialStart: 1,
          serialEnd: 25,
          quantity: 25,
          isChecked: false,
          checkedDate: '23/11/2021',
          status: 'Passed',
          damageInfo: ''
        },
        {
          id: randomIdGenerator(),
          bundleNumber: '45-M-01-B',
          date: '23/11/2021',
          serialStart: 1,
          serialEnd: 25,
          quantity: 25,
          isChecked: false,
          checkedDate: '23/11/2021',
          status: 'Passed',
          damageInfo: ''
        },
        {
          id: randomIdGenerator(),
          bundleNumber: '45-M-01-PO',
          date: '23/11/2021',
          serialStart: 1,
          serialEnd: 25,
          quantity: 25,
          isChecked: false,
          checkedDate: '23/11/2021',
          status: 'Passed',
          damageInfo: ''
        },
        {
          id: randomIdGenerator(),
          bundleNumber: '45-M-01-Cuff',
          date: '23/11/2021',
          serialStart: 1,
          serialEnd: 25,
          quantity: 25,
          isChecked: false,
          checkedDate: '23/11/2021',
          status: 'Passed',
          damageInfo: ''
        }
      ]
    }
  ]);
  //#endregion

  const { items, total } = useSelector(({ bundleReducer }) => bundleReducer);

  //#region Effect
  useEffect(() => {
    dispatch(fetchBundlesByQuery({ page: currentPage, rowsPerPage }));
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
    dispatch(fetchBundlesByQuery({ q: val, rowsPerPage, page: currentPage }));
  };

  const handleSort = (column, direction) => {
    const { selector } = column;
    dispatch(fetchBundlesByQuery({ sortedBy: direction, sortedColumn: selector }));
  };

  // ** Function for toggle panel check bundle details
  const toggleBundleDetails = idx => {
    const _bundle = [...bundle];
    const clickedItem = _bundle[idx];
    clickedItem.isOpen = !clickedItem.isOpen;
    _bundle[idx] = clickedItem;
    setBundle(_bundle);
  };
  // Function for modal open (Action)
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };
  // Function for modal open (Passed Table Damage Info)
  const handleOpenModalDamageInfo = () => {
    setHasDamageInfo(!hasDamageInfo);
  };

  //#endregion

  const toggle = tab => {
    if (active !== tab) {
      setActive(tab);
    }
  };

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
            Bundle List
          </CardTitle>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={active === '1'}
                  onClick={() => {
                    toggle('1');
                  }}
                >
                  <span>Assign Sewing</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={active === '2'}
                  onClick={() => {
                    toggle('2');
                  }}
                >
                  Assign External Process
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={active === '3'}
                  onClick={() => {
                    toggle('3');
                  }}
                >
                  Passed
                </NavLink>
              </NavItem>
            </Nav>
            <TableCustomerHeader
              handlePerPage={handlePerPage}
              rowsPerPage={rowsPerPage}
              searchTerm={searchTerm}
            ></TableCustomerHeader>
            <TabContent
              activeTab={active}
              style={{ backgroundColor: 'white', border: 'solid #dddddd 1px' }}
            >
              <TabPane tabId="1">
                <DataTable
                  // onSelectedRowsChange={handleRowSelected}
                  onSort={handleSort}
                  progressPending={!items.length}
                  progressComponent={<CustomPreLoader />}
                  contextActions={
                    <Button.Ripple
                      // onClick={handleDeleteByRange}
                      className="btn-icon "
                      color="flat-primary"
                    >
                      <Menu size={24} onClick={handleOpenModal} />
                    </Button.Ripple>
                  }
                  dense
                  subHeader={false}
                  highlightOnHover
                  selectableRows
                  // clearSelectedRows={clearSelectedRow}
                  responsive={true}
                  paginationServer
                  expandOnRowClicked
                  persistTableHead
                  columns={bundleAssingSewingTableColumn}
                  sortIcon={<ChevronDown />}
                  className="react-dataTable"
                  data={items}
                />
              </TabPane>
              <TabPane tabId="2">
                <DataTable
                  onSort={handleSort}
                  progressPending={!assignEPData.length}
                  progressComponent={<CustomPreLoader />}
                  contextActions={
                    <Button.Ripple className="btn-icon " color="flat-primary">
                      <Menu size={24} onClick={handleOpenModal} />
                    </Button.Ripple>
                  }
                  dense
                  subHeader={false}
                  highlightOnHover
                  selectableRows
                  responsive={true}
                  paginationServer
                  expandOnRowClicked
                  persistTableHead
                  columns={bundleAssingEPTableColumn}
                  sortIcon={<ChevronDown />}
                  className="react-dataTable"
                  data={assignEPData}
                />
              </TabPane>
              <TabPane tabId="3">
                <div className="border rounded rounded-3 p-1">
                  <Row>
                    <FormGroup tag={Col} xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Table
                        className={classes.bundlePassedTable}
                        size="sm"
                        responsive
                        bordered={true}
                      >
                        <thead className={`thead-dark table-bordered ${classes.stickyTableHead}`}>
                          <tr className="text-center">
                            <th style={{ minWidth: '4px' }}>
                              <strong>#</strong>
                            </th>
                            <th>
                              <strong>Cut Plan No</strong>
                            </th>
                            <th>
                              <strong>Buyer</strong>
                            </th>
                            <th>
                              <strong>Style</strong>
                            </th>
                            <th>
                              <strong>PO</strong>
                            </th>
                            <th>
                              <strong>Style Category</strong>
                            </th>
                            <th>
                              <strong>Color</strong>
                            </th>
                            <th>
                              <strong>Shipment Date</strong>
                            </th>
                            <th>
                              <strong>Shipment Mode</strong>
                            </th>
                            <th>
                              <strong>Destination</strong>
                            </th>
                            <th>
                              <strong>Quantity</strong>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {bundle.map((po, idx) => (
                            <Fragment key={po.id + po.id}>
                              <tr key={po.id}>
                                <td style={{ minWidth: '4px' }}>
                                  <Button.Ripple
                                    for="collapseId"
                                    tag={Label}
                                    onClick={() => {
                                      toggleBundleDetails(idx);
                                    }}
                                    className="btn-icon"
                                    color="flat-primary"
                                  >
                                    {po.isOpen ? (
                                      <Minimize2 id="collapseId" size={15} color="#57C69D" />
                                    ) : (
                                      <Maximize2 id="collapseId" size={15} color="#7367f0" />
                                    )}
                                  </Button.Ripple>
                                </td>
                                <td>{po.cutPlanNo}</td>
                                <td>{po.buyer}</td>
                                <td>{po.style}</td>
                                <td>{po.po}</td>
                                <td>{po.styleCategory}</td>
                                <td>{po.color}</td>
                                <td>{po.shipmentDate}</td>
                                <td>{po.shipmentMode}</td>
                                <td>{po.destination}</td>
                                <td>{po.quantity}</td>
                              </tr>
                              <tr>
                                <td
                                  colSpan={10}
                                  style={{
                                    padding: '2px 10px !important',
                                    backgroundColor: '#fff'
                                  }}
                                >
                                  <Collapse isOpen={po.isOpen}>
                                    <Table className={classes.childTable}>
                                      <thead className="thead-light table-bordered">
                                        <tr>
                                          <th></th>
                                          <th>Bundle Number</th>
                                          <th>Date</th>
                                          <th>Serial Start</th>
                                          <th>Serial End</th>
                                          <th>Quantity</th>
                                          <th>Checked</th>
                                          <th>Checked Date</th>
                                          <th>Status</th>
                                          <th>Damage Info</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {po.details.map(bundle => (
                                          <tr key={bundle.id}>
                                            <td></td>
                                            <td>{bundle.bundleNumber}</td>
                                            <td>{bundle.date}</td>
                                            <td>{bundle.serialStart}</td>
                                            <td>{bundle.serialEnd}</td>
                                            <td>{bundle.quantity}</td>
                                            <td>
                                              <CustomInput
                                                type="checkbox"
                                                className="custom-control-primary"
                                                id={bundle.id}
                                                checked
                                                inline
                                                onChange={() => {}}
                                              />
                                            </td>
                                            <td>{bundle.checkedDate}</td>
                                            <td>{bundle.status}</td>
                                            <td>
                                              <Eye
                                                onClick={handleOpenModalDamageInfo}
                                                className="cursor-pointer"
                                              ></Eye>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </Table>
                                  </Collapse>
                                </td>
                              </tr>
                            </Fragment>
                          ))}
                        </tbody>
                      </Table>
                    </FormGroup>
                  </Row>
                </div>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
        <CustomPagination
          count={Number(Math.ceil(total / rowsPerPage))}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Card>
      {openModal && <BundleAssignedSewing openModal={openModal} setOpenModal={setOpenModal} />}
      {hasDamageInfo && (
        <BundleAssignEPRejectInfo openModal={hasDamageInfo} setOpenModal={setHasDamageInfo} />
      )}
    </>
  );
};

export default BundleListPage;

/** Change Log
 * 23-Jan-2022 (Iqbal): Bundle List Page and Tab With data render from mock
 */
