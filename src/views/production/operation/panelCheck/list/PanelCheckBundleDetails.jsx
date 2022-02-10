/**
 * Title: Panel Check Bundle Details
 * Description: Panel Check Bundle Details
 * Author: Iqbal Hossain
 * Date: 05-January-2022
 * Modified: 22-January-2022
 */

import { details } from '@fake-db/production/operation/panelCheckMock';
import React, { Fragment, useEffect, useState } from 'react';
import { Settings } from 'react-feather';
import { useDispatch } from 'react-redux';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import ResizableTable from 'utility/custom/ResizableTable';
import PanelCheckRejectInfo from '../details/PanelCheckRejectInfo';
import { fetchPanelChecksByQuery } from '../store/actions';
import classes from '../styles/PanelCheckBundleDetails.module.scss';
const PanelCheckBundleDetails = () => {
  const dispatch = useDispatch();
  //   const { items } = useSelector(({ panelCheckReducer }) => panelCheckReducer);
  //#region States
  const [openModal, setOpenModal] = useState(false);

  //#endregion

  //#region Effects
  useEffect(() => {
    dispatch(fetchPanelChecksByQuery());
  }, [dispatch]);
  //#endregion

  //#region Events
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };
  //#endregion

  return (
    <div>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <div className={classes.panelCheckDetailsTable}>
            <ResizableTable
              mainClass="panelCheckTable"
              tableId="panelCheckTableId"
              className="panel-check-table"
              size="sm"
              responsive={true}
              bordered={true}
            >
              <thead className="thead-secondary">
                <tr className="text-center">
                  <th style={{ minWidth: '4px' }}>
                    <strong>#</strong>
                  </th>
                  <th>
                    <strong>Bundle Number</strong>
                  </th>
                  <th>
                    <strong>Date</strong>
                  </th>
                  <th>
                    <strong>Serial Start</strong>
                  </th>
                  <th>
                    <strong>Serial End</strong>
                  </th>
                  <th>
                    <strong>Quantity</strong>
                  </th>
                  <th>
                    <strong>Status</strong>
                  </th>
                  <th>
                    <strong>Has Reject</strong>
                  </th>
                  <th>
                    <strong>Reject Info</strong>
                  </th>
                  <th>
                    <strong>Checked</strong>
                  </th>
                </tr>
              </thead>
              <tbody className="text-center">
                {details.map((panelCheck, index) => (
                  <Fragment key={panelCheck.id + panelCheck.id}>
                    <tr key={panelCheck.id + 1}>
                      <td style={{ minWidth: '4px' }}>{index + 1}</td>
                      <td>
                        <Label className="text-dark font-weight-bold" for="styleNo">
                          {panelCheck.bundleNumber}
                        </Label>
                      </td>
                      <td>
                        <Label className="text-dark font-weight-bold" for="deliveryDestination">
                          {panelCheck.date}
                        </Label>
                      </td>

                      <td>
                        <Label className="text-dark font-weight-bold" for="shipmentMode">
                          {panelCheck.serialStart}
                        </Label>
                      </td>
                      <td>
                        <Label className="text-dark font-weight-bold" for="orderQuantity">
                          {panelCheck.serialEnd}
                        </Label>
                      </td>

                      <td>
                        <Label className="text-dark font-weight-bold" for="orderUOM">
                          {panelCheck.quantity}
                        </Label>
                      </td>
                      <td>
                        <Label className="text-dark font-weight-bold" for="orderUOM">
                          {panelCheck.status}
                        </Label>
                      </td>
                      <td>
                        <Input type="checkbox"></Input>
                      </td>
                      <td>
                        <Settings onClick={handleOpenModal}></Settings>
                      </td>
                      <td>
                        <Button color="success">Checked</Button>
                      </td>
                    </tr>
                  </Fragment>
                ))}
              </tbody>
            </ResizableTable>
          </div>
          {openModal && <PanelCheckRejectInfo openModal={openModal} setOpenModal={setOpenModal} />}
        </Col>
      </Row>
    </div>
  );
};

export default PanelCheckBundleDetails;

/** Change Log
 * 22-Jan-2022(Iqbal): panel check bundle details page
 */
