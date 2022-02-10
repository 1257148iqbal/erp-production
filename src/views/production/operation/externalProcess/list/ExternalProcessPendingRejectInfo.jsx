/*
     Title: Reject Info
     Description: Reject Info
     Author: Iqbal Hossain
     Date: 25-January-2022
     Modified: 25-January-2022
*/

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { Card, CardBody, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';
import CustomModal from 'utility/custom/CustomModal';
import { selectThemeColors } from 'utility/Utils';

const serialData = [
  { label: 1, value: 1 },
  { label: 2, value: 2 },
  { label: 3, value: 3 },
  { label: 4, value: 4 },
  { label: 5, value: 5 },
  { label: 6, value: 6 },
  { label: 7, value: 7 },
  { label: 8, value: 8 }
];
const rejectTypeData = [
  { label: 'Reject', value: 'Reject' },
  { label: 'Replace', value: 'Replace' }
];

const ExternalProcessPendingRejectInfo = props => {
  const { openModal, setOpenModal } = props;

  const { errors, handleSubmit } = useForm();

  //#region State
  const [serials, setSerials] = useState(null);
  const [rejectType, setRejectType] = useState(null);

  //#endregion
  //#region  Events

  const handleMainModalToggleClose = () => {
    setOpenModal(!openModal);
  };

  const handleModalSubmit = () => {
    setOpenModal(!openModal);
  };

  //#endregion
  return (
    <div>
      <CustomModal
        modalTypeClass="vertically-centered-modal"
        className="modal-dialog-centered modal-lg"
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleMainModelSubmit={handleModalSubmit}
        handleMainModalToggleClose={handleMainModalToggleClose}
        title="Panel Check Reject Info"
      >
        <Card>
          <CardBody className="card-body-override">
            <Form onSubmit={handleSubmit(handleModalSubmit)}>
              <Col xs="12" sm="12" md="12" lg="12" xl="12">
                <Row className="rounded rounded-3 mr-1">
                  <FormGroup tag={Col} xs={6} sm={6} md={4} lg={4} xl={4}>
                    <Label for="serialNo">Serial No</Label>
                    <CreatableSelect
                      id="serialNo"
                      isSearchable
                      isClearable
                      theme={selectThemeColors}
                      options={serialData}
                      classNamePrefix="select"
                      value={serials}
                      onChange={data => {
                        setSerials(data);
                      }}
                    />
                    {errors && errors.serialNo && (
                      <FormFeedback>serialNo is Required!</FormFeedback>
                    )}
                  </FormGroup>
                  <FormGroup tag={Col} xs={6} sm={6} md={4} lg={4} xl={4}>
                    <Label for="rejectType">Reject Type</Label>
                    <Select
                      id="rejectType"
                      isSearchable
                      isClearable
                      bsSize="sm"
                      theme={selectThemeColors}
                      options={rejectTypeData}
                      classNamePrefix="select"
                      value={rejectType}
                      onChange={data => {
                        setRejectType(data);
                      }}
                    />
                    {errors && errors.rejectType && (
                      <FormFeedback>Reject Type is Required!</FormFeedback>
                    )}
                  </FormGroup>
                  <FormGroup tag={Col} xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Label for="name">Remarks</Label>
                    <Input name="remarks" id="remarks" placeholder="Remarks" />
                  </FormGroup>
                </Row>
              </Col>
            </Form>
          </CardBody>
        </Card>
      </CustomModal>
    </div>
  );
};

export default ExternalProcessPendingRejectInfo;

/** Change Log
 * 25-Jan-2022(Iqbal): Reject info modal create
 */
