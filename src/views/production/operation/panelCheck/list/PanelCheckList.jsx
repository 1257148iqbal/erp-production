/**
 * Title: Panel Check Edit Form
 * Description: Panel Check Edit Form
 * Author: Iqbal Hossain
 * Date: 05-January-2022
 * Modified: 05-January-2022
 */

import React, { Fragment, useEffect, useState } from 'react';
import { Maximize2, Minimize2, Settings } from 'react-feather';
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
  Row,
  Table
} from 'reactstrap';
import CustomPagination from 'utility/custom/production/CustomPagination';
import ResizableTable from 'utility/custom/ResizableTable';
import TableCustomerHeader from 'utility/custom/TableCustomerHeader';
import { randomIdGenerator } from 'utility/Utils';
import PanelCheckRejectInfo from '../details/PanelCheckRejectInfo';
import { fetchPanelChecksByQuery } from '../store/actions';
import classes from '../styles/PanelCheckBundleDetails.module.scss';

// const breadcrumb = [
//   {
//     id: 'home',
//     name: 'Home',
//     link: '/',
//     isActive: false
//   },
//   {
//     id: 'panelCheck',
//     name: 'List',
//     link: '/panel-check',
//     isActive: false
//   }
// ];
const PanelCheckListPage = () => {
  const dispatch = useDispatch();
  const { total } = useSelector(({ panelCheckReducer }) => panelCheckReducer);
  //#region States
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [panelCheck, setPanelCheck] = React.useState([
    {
      id: randomIdGenerator(),
      cutPlanNo: 'CP001',
      cutNo: '45',
      comboNo: '1',
      size: 'M',
      color: 'Red',
      isOpen: false,
      details: [
        {
          id: randomIdGenerator(),
          bundleNumber: '45-M-01-F',
          date: '23/11/2021',
          serialStart: 1,
          serialEnd: 25,
          quantity: 25,
          status: 'pending',
          hasReject: false,
          rejectInfo: '',
          isChecked: false
        },
        {
          id: randomIdGenerator(),
          bundleNumber: '45-M-01-B',
          date: '23/11/2021',
          serialStart: 1,
          serialEnd: 25,
          quantity: 25,
          status: 'pending',
          hasReject: false,
          rejectInfo: '',
          isChecked: false
        },
        {
          id: randomIdGenerator(),
          bundleNumber: '45-M-01-PO',
          date: '23/11/2021',
          serialStart: 1,
          serialEnd: 25,
          quantity: 25,
          status: 'pending',
          hasReject: false,
          rejectInfo: '',
          isChecked: false
        },
        {
          id: randomIdGenerator(),
          bundleNumber: '45-M-01-Cuff',
          date: '23/11/2021',
          serialStart: 1,
          serialEnd: 25,
          quantity: 25,
          status: 'pending',
          hasReject: false,
          rejectInfo: '',
          isChecked: false
        },
        {
          id: randomIdGenerator(),
          bundleNumber: '45-M-01-Coller',
          date: '23/11/2021',
          serialStart: 1,
          serialEnd: 25,
          quantity: 25,
          status: 'pending',
          hasReject: false,
          rejectInfo: '',
          isChecked: false
        }
      ]
    },
    {
      id: randomIdGenerator(),
      cutPlanNo: 'CP002',
      cutNo: '45',
      comboNo: '2',
      size: 'M',
      color: 'Red',
      isOpen: false,
      details: [
        {
          id: randomIdGenerator(),
          bundleNumber: '45-M-01-F',
          date: '23/11/2021',
          serialStart: 1,
          serialEnd: 25,
          quantity: 25,
          status: 'pending',
          hasReject: false,
          rejectInfo: '',
          isChecked: false
        },
        {
          id: randomIdGenerator(),
          bundleNumber: '45-M-01-B',
          date: '23/11/2021',
          serialStart: 1,
          serialEnd: 25,
          quantity: 25,
          status: 'pending',
          hasReject: false,
          rejectInfo: '',
          isChecked: false
        },
        {
          id: randomIdGenerator(),
          bundleNumber: '45-M-01-PO',
          date: '23/11/2021',
          serialStart: 1,
          serialEnd: 25,
          quantity: 25,
          status: 'pending',
          hasReject: false,
          rejectInfo: '',
          isChecked: false
        },
        {
          id: randomIdGenerator(),
          bundleNumber: '45-M-01-Cuff',
          date: '23/11/2021',
          serialStart: 1,
          serialEnd: 25,
          quantity: 25,
          status: 'pending',
          hasReject: false,
          rejectInfo: '',
          isChecked: false
        },
        {
          id: randomIdGenerator(),
          bundleNumber: '45-M-01-Coller',
          date: '23/11/2021',
          serialStart: 1,
          serialEnd: 25,
          quantity: 25,
          status: 'pending',
          hasReject: false,
          rejectInfo: '',
          isChecked: false
        }
      ]
    },
    {
      id: randomIdGenerator(),
      cutPlanNo: 'CP003',
      cutNo: '45',
      comboNo: 3,
      size: 'M',
      color: 'Red',
      isOpen: false,
      details: [
        {
          id: randomIdGenerator(),
          bundleNumber: '45-M-01-F',
          date: '23/11/2021',
          serialStart: 1,
          serialEnd: 25,
          quantity: 25,
          status: 'pending',
          hasReject: false,
          rejectInfo: '',
          isChecked: false
        },
        {
          id: randomIdGenerator(),
          bundleNumber: '45-M-01-B',
          date: '23/11/2021',
          serialStart: 1,
          serialEnd: 25,
          quantity: 25,
          status: 'pending',
          hasReject: false,
          rejectInfo: '',
          isChecked: false
        },
        {
          id: randomIdGenerator(),
          bundleNumber: '45-M-01-PO',
          date: '23/11/2021',
          serialStart: 1,
          serialEnd: 25,
          quantity: 25,
          status: 'pending',
          hasReject: false,
          rejectInfo: '',
          isChecked: false
        },
        {
          id: randomIdGenerator(),
          bundleNumber: '45-M-01-Cuff',
          date: '23/11/2021',
          serialStart: 1,
          serialEnd: 25,
          quantity: 25,
          status: 'pending',
          hasReject: false,
          rejectInfo: '',
          isChecked: false
        },
        {
          id: randomIdGenerator(),
          bundleNumber: '45-M-01-Coller',
          date: '23/11/2021',
          serialStart: 1,
          serialEnd: 25,
          quantity: 25,
          status: 'pending',
          hasReject: false,
          rejectInfo: '',
          isChecked: false
        }
      ]
    }
  ]);
  const [openModal, setOpenModal] = useState(false);

  //#endregion

  //#region Effects
  useEffect(() => {
    dispatch(fetchPanelChecksByQuery({ page: currentPage, rowsPerPage }));
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
    dispatch(fetchPanelChecksByQuery({ q: val, rowsPerPage, page: currentPage }));
  };

  const handleSort = (column, direction) => {
    const { selector } = column;
    dispatch(fetchPanelChecksByQuery({ sortedBy: direction, sortedColumn: selector }));
  };

  // ** Function for toggle panel check bundle details
  const toggleBundleDetails = idx => {
    const _panelCheck = [...panelCheck];
    const clickedItem = _panelCheck[idx];
    clickedItem.isOpen = !clickedItem.isOpen;
    _panelCheck[idx] = clickedItem;
    setPanelCheck(_panelCheck);
  };

  // ** Function for toggle check bundle details
  const toggleChecked = (idx, bundleIdx) => {
    const _panelCheck = [...panelCheck];
    const clickedItem = _panelCheck[idx];
    const _bundleDetails = [...clickedItem.details];
    const checkedItem = _bundleDetails[bundleIdx];
    checkedItem.isChecked = !checkedItem.isChecked;
    _bundleDetails[bundleIdx] = checkedItem;
    _panelCheck[idx] = { ...clickedItem, details: _bundleDetails };
    setPanelCheck(_panelCheck);
  };

  // Function for modal open Reject Info
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };
  //#endregion

  return (
    <div>
      {/* <Card>
        <CardTitle tag="h4">
          <ActionMenu breadcrumb={breadcrumb} title="Panel Check"></ActionMenu>
        </CardTitle>
      </Card> */}
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
        <CardHeader>
          <CardTitle tag="h2">Panel Check</CardTitle>
        </CardHeader>
        <TableCustomerHeader
          handlePerPage={handlePerPage}
          rowsPerPage={rowsPerPage}
          searchTerm={searchTerm}
        ></TableCustomerHeader>

        <div className="border rounded rounded-3 p-1">
          <Row>
            <FormGroup tag={Col} xs={12} sm={12} md={12} lg={12} xl={12}>
              <ResizableTable
                mainClass={classes.panelCheckDetailsTable}
                tableId="panelCheckTableId"
                className="panel-check-table"
                size="sm"
                responsive={true}
                bordered={true}
                onSort={handleSort}
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
                      <strong>Cut No</strong>
                    </th>
                    <th>
                      <strong>Combo No</strong>
                    </th>
                    <th>
                      <strong>Size</strong>
                    </th>
                    <th>
                      <strong>Color</strong>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {panelCheck.map((panelCheck, idx) => (
                    <Fragment key={panelCheck.id + panelCheck.id}>
                      <tr key={panelCheck.id}>
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
                            {panelCheck.isOpen ? (
                              <Minimize2 id="collapseId" size={15} color="#57C69D" />
                            ) : (
                              <Maximize2 id="collapseId" size={15} color="#7367f0" />
                            )}
                          </Button.Ripple>
                        </td>
                        <td>{panelCheck.cutPlanNo}</td>
                        <td>{panelCheck.cutNo}</td>
                        <td>{panelCheck.comboNo}</td>
                        <td>{panelCheck.size}</td>
                        <td>{panelCheck.color}</td>
                      </tr>
                      <tr>
                        <td
                          colSpan={10}
                          style={{ padding: '2px 10px !important', backgroundColor: '#fff' }}
                        >
                          <Collapse isOpen={panelCheck.isOpen}>
                            <Table className={classes.childTable}>
                              <thead className="thead-light table-bordered">
                                <tr>
                                  <th></th>
                                  <th>Bundle Number</th>
                                  <th>Date</th>
                                  <th>Serial Start</th>
                                  <th>Serial End</th>
                                  <th>Quantity</th>
                                  <th>Status</th>
                                  <th>Has Reject</th>
                                  <th>Reject Info</th>
                                  <th>Checked</th>
                                </tr>
                              </thead>
                              <tbody>
                                {panelCheck.details.map((bundle, bundleIdx) => (
                                  <tr key={bundle.id}>
                                    <td></td>
                                    <td>{bundle.bundleNumber}</td>
                                    <td>{bundle.date}</td>
                                    <td>{bundle.serialStart}</td>
                                    <td>{bundle.serialEnd}</td>
                                    <td>{bundle.quantity}</td>
                                    <td>{bundle.status}</td>
                                    <td className="text-center">
                                      <CustomInput
                                        type="checkbox"
                                        className="custom-control-primary"
                                        id={bundle.id}
                                        checked={bundle.isChecked}
                                        inline
                                        onChange={() => {
                                          toggleChecked(idx, bundleIdx);
                                        }}
                                      />
                                    </td>
                                    <td>
                                      {bundle.isChecked ? (
                                        <Settings
                                          className="cursor-pointer"
                                          onClick={handleOpenModal}
                                        ></Settings>
                                      ) : (
                                        <Settings color="#E0E0E0"></Settings>
                                      )}
                                    </td>
                                    <td>
                                      <Button color="success">Checked</Button>
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
              </ResizableTable>
            </FormGroup>
          </Row>
          {openModal && <PanelCheckRejectInfo openModal={openModal} setOpenModal={setOpenModal} />}
        </div>

        <CustomPagination
          count={Number(Math.ceil(total / rowsPerPage))}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Card>
    </div>
  );
};

export default PanelCheckListPage;

/** Change Log
 * 23-Jan-2022 (Iqbal): Custom pagination, panel check Reject Info modal open  and List Page, toggleChecked
 */
