/**
 * Title: External List Form
 * Description: External List Form
 * Author: Iqbal Hossain
 * Date: 24-January-2022
 * Modified: 24-January-2022
 */

import '@custom-styles/merchandising/others/custom-table.scss';
import React, { Fragment, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDown, Eye, Maximize2, Menu, Minimize2, Settings } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
import { notify } from 'utility/custom/notifications';
import CustomPagination from 'utility/custom/production/CustomPagination';
import { PlusIcon } from 'utility/custom/production/icons/CustomIcons';
import TableCustomerHeader from 'utility/custom/TableCustomerHeader';
import BundleAssignedSewing from '../../bundle/list/BundleAssignedSewing';
import ExternalProcessPassedRejectInfo from '../details/ExternalProcessPassedRejectInfo';
import { fetchExternalProcessByQuery } from '../store/actions';
import classes from '../style/ExternalProcessList.module.scss';
import ExternalProcessPendingRejectInfo from './ExternalProcessPendingRejectInfo';

const ExternalProcessList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  //#region State
  const [active, setActive] = useState('1');
  // const [openModal, setOpenModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [hasDamagePassed, setHasDamagePassed] = useState(false);
  const [hasDamagePending, setHasDamagePending] = useState(false);
  const [hasBundleAssigned, setHasBundleAssigned] = useState(false);
  const [externalProcess, setExternalProcess] = React.useState([
    {
      id: 1,
      transferRef: 'TR001',
      transferRefDate: '30/11/2021',
      transferTo: 'Cutting',
      isOpen: false,
      details: [
        {
          id: 4,
          bundleNumber: '45-M-01-M',
          date: '23/11/2021',
          serialStart: 1,
          serialEnd: 25,
          receivedQty: 25,
          sendQty: 24,
          hasReject: false,
          rejectInfo: '',
          hasError: false
        },
        {
          id: 5,
          bundleNumber: '45-M-01-F',
          date: '23/11/2021',
          serialStart: 1,
          serialEnd: 25,
          receivedQty: 25,
          sendQty: 24,
          hasReject: false,
          rejectInfo: '',
          hasError: false
        }
      ]
    },
    {
      id: 2,
      transferRef: 'TR002',
      transferRefDate: '30/11/2021',
      transferTo: 'Cutting',
      isOpen: false,
      details: [
        {
          id: 6,
          bundleNumber: '45-M-01-F',
          date: '23/11/2021',
          serialStart: 1,
          serialEnd: 25,
          receivedQty: 25,
          sendQty: 24,
          hasReject: false,
          rejectInfo: '',
          hasError: false
        },
        {
          id: 7,
          bundleNumber: '45-M-01-F',
          date: '23/11/2021',
          serialStart: 1,
          serialEnd: 25,
          receivedQty: 25,
          sendQty: 24,
          hasReject: false,
          rejectInfo: '',
          hasError: false
        },
        {
          id: 8,
          bundleNumber: '45-M-01-F',
          date: '23/11/2021',
          serialStart: 1,
          serialEnd: 25,
          receivedQty: 25,
          sendQty: 24,
          hasReject: false,
          rejectInfo: '',
          hasError: false
        }
      ]
    },
    {
      id: 3,
      transferRef: 'TR003',
      transferRefDate: '30/11/2021',
      transferTo: 'Cutting',
      isOpen: false,
      details: [
        {
          id: 9,
          bundleNumber: '45-M-01-F',
          date: '23/11/2021',
          serialStart: 1,
          serialEnd: 25,
          receivedQty: 25,
          sendQty: 24,
          hasReject: false,
          rejectInfo: '',
          hasError: false
        }
      ]
    }
  ]);

  //#endregion

  const { total } = useSelector(({ externalProcessReducer }) => externalProcessReducer);

  //#region Effect
  useEffect(() => {
    dispatch(fetchExternalProcessByQuery({ page: currentPage, rowsPerPage }));
  }, [dispatch, rowsPerPage, currentPage]);
  //#endregion

  //#region Events

  // Function for modal open (Passed Table Damage Passed)
  const handleOpenModalDamagePassed = () => {
    setHasDamagePassed(!hasDamagePassed);
  };
  // Function for modal open (Passed Table Damage Pending)
  const handleOpenModalDamagePending = () => {
    setHasDamagePending(!hasDamagePending);
  };
  // Function for modal open (Bundle Assigned Sewing)
  const handleOpenModalBundleAssigned = () => {
    setHasBundleAssigned(!hasBundleAssigned);
  };
  // Function for modal open (Bundle Assigned Sewing)

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
    dispatch(fetchExternalProcessByQuery({ q: val, rowsPerPage, page: currentPage }));
  };

  // ** Function for toggle EP details
  const toggleEPDetails = idx => {
    const _externalProcess = [...externalProcess];
    const clickedItem = _externalProcess[idx];
    clickedItem.isOpen = !clickedItem.isOpen;
    _externalProcess[idx] = clickedItem;
    setExternalProcess(_externalProcess);
  };

  // ** Function for toggle EP Details has Reject
  const toggleHasReject = (idx, epIdx) => {
    const _externalProcess = [...externalProcess];
    const clickedItem = _externalProcess[idx];
    const _epDetails = [...clickedItem.details];

    const checkedItem = _epDetails[epIdx];
    checkedItem.hasReject = !checkedItem.hasReject;
    _epDetails[epIdx] = checkedItem;
    _externalProcess[idx] = { ...clickedItem, details: _epDetails };
    setExternalProcess(_externalProcess);
  };

  //Function for Send Qty
  const onSendQtyChange = (e, epId, epdId) => {
    const { value } = e.target;
    const _externalProcess = [...externalProcess];
    const clickedItem = _externalProcess[epId];
    const _epDetails = [...clickedItem.details];
    const checkedItem = _epDetails[epdId];
    checkedItem.sendQty = value;
    let _sendQty = checkedItem.sendQty ? checkedItem.sendQty : checkedItem.receivedQty;
    if (_sendQty > checkedItem.receivedQty) {
      notify('warning', `Can not given Large value from ${checkedItem.receivedQty}`);
      checkedItem.hasError = !checkedItem.hasError;
      _sendQty = checkedItem.receivedQty;
    }
    checkedItem.sendQty = _sendQty;
    // _epDetails[epdId] = checkedItem;
    // _externalProcess[epId] = { ...clickedItem, details: _epDetails };
    setExternalProcess(_externalProcess);
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
            External Process
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
                  Pending
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={active === '2'}
                  onClick={() => {
                    toggle('2');
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
            >
              <PlusIcon
                onClick={() =>
                  history.push({
                    pathname: `external-process-new`
                  })
                }
              />
            </TableCustomerHeader>
            <TabContent
              activeTab={active}
              style={{ backgroundColor: 'white', border: 'solid #dddddd 1px' }}
            >
              <TabPane tabId="1">
                <div className="border rounded rounded-3 p-1">
                  <Row>
                    <FormGroup tag={Col} xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Table
                        className={classes.externalProcessTable}
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
                              <strong>Transfer Ref</strong>
                            </th>
                            <th>
                              <strong>Transfer Ref Date</strong>
                            </th>
                            <th>
                              <strong>Transfer To</strong>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {externalProcess.map((ep, idx) => (
                            <Fragment key={ep.id + ep.id}>
                              <tr key={ep.id}>
                                <td style={{ minWidth: '4px' }}>
                                  <Button.Ripple
                                    for="collapseId"
                                    tag={Label}
                                    onClick={() => {
                                      toggleEPDetails(idx);
                                    }}
                                    className="btn-icon"
                                    color="flat-primary"
                                  >
                                    {ep.isOpen ? (
                                      <Minimize2 id="collapseId" size={15} color="#57C69D" />
                                    ) : (
                                      <Maximize2 id="collapseId" size={15} color="#7367f0" />
                                    )}
                                  </Button.Ripple>
                                </td>
                                <td>{ep.transferRef}</td>
                                <td>{ep.transferRefDate}</td>
                                <td>{ep.transferTo}</td>
                              </tr>
                              <tr>
                                <td
                                  colSpan={10}
                                  style={{
                                    padding: '2px 10px !important',
                                    backgroundColor: '#fff'
                                  }}
                                >
                                  <Collapse isOpen={ep.isOpen}>
                                    <DataTable
                                      progressPending={!ep.details.length}
                                      progressComponent={<CustomPreLoader />}
                                      contextActions={
                                        <Button className="btn-icon " color="flat-primary">
                                          <Menu size={24} onClick={handleOpenModalBundleAssigned} />
                                        </Button>
                                      }
                                      dense
                                      subHeader={false}
                                      highlightOnHover
                                      selectableRows
                                      responsive
                                      paginationServer
                                      expandOnRowClicked
                                      persistTableHead
                                      columns={[
                                        {
                                          name: 'Bundle Number',
                                          minWidth: '170px',
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
                                          name: 'Received Qty',
                                          minWidth: '150px',
                                          selector: 'receivedQty',
                                          sortable: true,
                                          cell: row => row.receivedQty
                                        },
                                        {
                                          id: row => `ep-details-${row.id}`,
                                          name: 'Send Qty',
                                          minWidth: '150px',
                                          selector: 'sendQty',
                                          sortable: true,
                                          accessor: 'sendQty',
                                          cell: (row, epIdx) => (
                                            <Input
                                              type="number"
                                              name="sendQty"
                                              bsSize="sm"
                                              value={row.sendQty}
                                              onSelect={e => e.target.select()}
                                              onChange={e => onSendQtyChange(e, idx, epIdx)}
                                            />
                                          )
                                        },
                                        {
                                          name: 'Has Reject',
                                          minWidth: '150px',
                                          selector: 'hasReject',
                                          sortable: true,
                                          cell: (row, epIdx) => (
                                            <CustomInput
                                              type="checkbox"
                                              className="custom-control-primary"
                                              id={`ep-details-${row.id}`}
                                              checked={row.hasReject}
                                              inline
                                              onChange={() => {
                                                toggleHasReject(idx, epIdx);
                                              }}
                                            />
                                          )
                                        },
                                        {
                                          name: 'Reject Info',
                                          minWidth: '150px',
                                          selector: 'rejectInfo',
                                          sortable: true,
                                          cell: row => (
                                            <div>
                                              {row.hasReject ? (
                                                <Settings
                                                  className="cursor-pointer"
                                                  onClick={handleOpenModalDamagePending}
                                                ></Settings>
                                              ) : (
                                                <Settings color="#E0E0E0"></Settings>
                                              )}
                                            </div>
                                          )
                                        }
                                      ]}
                                      sortIcon={<ChevronDown />}
                                      className="react-dataTable react-table-height"
                                      data={ep.details}
                                    />
                                  </Collapse>

                                  {/* <Collapse isOpen={ep.isOpen}>
                                    <Table className={classes.childTable}>
                                      <thead className="thead-light table-bordered">
                                        <tr>
                                          <th></th>
                                          <th>Bundle Number</th>
                                          <th>Date</th>
                                          <th>Serial Start</th>
                                          <th>Serial End</th>
                                          <th>Received Qty</th>
                                          <th>Send Qty</th>
                                          <th>Has Reject</th>
                                          <th>Reject Info</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {ep.details.map(bundle => (
                                          <tr key={bundle.id}>
                                            <td></td>
                                            <td>{bundle.bundleNumber}</td>
                                            <td>{bundle.date}</td>
                                            <td>{bundle.serialStart}</td>
                                            <td>{bundle.serialEnd}</td>
                                            <td>{bundle.receivedQty}</td>
                                            <td>{bundle.sendQty}</td>
                                            <td>{bundle.hasReject}</td>
                                            <td>{bundle.rejectInfo}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </Table>
                                  </Collapse> */}
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
              <TabPane tabId="2">
                <div className="border rounded rounded-3 p-1">
                  <Row>
                    <FormGroup tag={Col} xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Table
                        className={classes.externalProcessTable}
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
                              <strong>Transfer Ref</strong>
                            </th>
                            <th>
                              <strong>Transfer Ref Date</strong>
                            </th>
                            <th>
                              <strong>Transfer To</strong>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {externalProcess.map((ep, idx) => (
                            <Fragment key={ep.id + ep.id}>
                              <tr key={ep.id}>
                                <td style={{ minWidth: '4px' }}>
                                  <Button.Ripple
                                    for="collapseId"
                                    tag={Label}
                                    onClick={() => {
                                      toggleEPDetails(idx);
                                    }}
                                    className="btn-icon"
                                    color="flat-primary"
                                  >
                                    {ep.isOpen ? (
                                      <Minimize2 id="collapseId" size={15} color="#57C69D" />
                                    ) : (
                                      <Maximize2 id="collapseId" size={15} color="#7367f0" />
                                    )}
                                  </Button.Ripple>
                                </td>
                                <td>{ep.transferRef}</td>
                                <td>{ep.transferRefDate}</td>
                                <td>{ep.transferTo}</td>
                              </tr>
                              <tr>
                                <td
                                  colSpan={10}
                                  style={{
                                    padding: '2px 10px !important',
                                    backgroundColor: '#fff'
                                  }}
                                >
                                  <Collapse isOpen={ep.isOpen}>
                                    <Table className={classes.childTable}>
                                      <thead className="thead-light table-bordered">
                                        <tr>
                                          <th></th>
                                          <th>Bundle Number</th>
                                          <th>Date</th>
                                          <th>Serial Start</th>
                                          <th>Serial End</th>
                                          <th>Received Qty</th>
                                          <th>Send Qty</th>
                                          <th>Has Reject</th>
                                          <th>Reject Info</th>
                                          <th>Status</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {ep.details.map(bundle => (
                                          <tr key={bundle.id}>
                                            <td></td>
                                            <td>{bundle.bundleNumber}</td>
                                            <td>{bundle.date}</td>
                                            <td>{bundle.serialStart}</td>
                                            <td>{bundle.serialEnd}</td>
                                            <td>{bundle.receivedQty}</td>
                                            <td>{bundle.sendQty}</td>
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
                                            <td>
                                              <Eye
                                                onClick={handleOpenModalDamagePassed}
                                                className="cursor-pointer"
                                              ></Eye>
                                            </td>
                                            <td>Passed</td>
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
      {hasDamagePassed && (
        <ExternalProcessPassedRejectInfo
          openModal={hasDamagePassed}
          setOpenModal={setHasDamagePassed}
        />
      )}
      {hasDamagePending && (
        <ExternalProcessPendingRejectInfo
          openModal={hasDamagePending}
          setOpenModal={setHasDamagePending}
        />
      )}
      {hasBundleAssigned && (
        <BundleAssignedSewing openModal={hasBundleAssigned} setOpenModal={setHasBundleAssigned} />
      )}
    </>
  );
};

export default ExternalProcessList;

/** Change Log
 * 24-Jan-2022 (Iqbal): External Process List Page and Tab With data render from mock and Onchange events
 */
