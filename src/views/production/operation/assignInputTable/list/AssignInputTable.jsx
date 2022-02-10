/*
     Title: Assign Input Table Info
     Description: Assign Input Table Info
     Author: Iqbal Hossain
     Date: 26-January-2022
     Modified: 26-January-2022
*/

import classnames from 'classnames';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { Card, CardBody, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';
import CustomModal from 'utility/custom/CustomModal';
import { selectThemeColors } from 'utility/Utils';

const zoneOwnerNameData = [
  { label: 'Md. Alamgir', value: 'Md. Alamgir' },
  { label: 'Sumon Borua', value: 'Sumon Borua' },
  { label: 'Md. Hasan ', value: 'Md. Hasan ' }
];
const lineData = [
  { label: 'Line 01', value: 'Line 01' },
  { label: 'Line 02', value: 'Line 02' },
  { label: 'Line 03', value: 'Line 03' },
  { label: 'Line 04', value: 'Line 04' },
  { label: 'Line 05', value: 'Line 05' },
  { label: 'Line 06', value: 'Line 06' }
];

const AssignInputTableInfo = props => {
  const { openModal, setOpenModal } = props;

  const { register, errors, handleSubmit } = useForm();

  //#region State
  const [zoneOwner, setZoneOwner] = useState(null);
  const [line, setLine] = useState(null);

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
        title="Assign Input Table Info"
      >
        <Card outline>
          <CardBody className="card-body-override">
            <Form onSubmit={handleSubmit(handleModalSubmit)}>
              <Col xs="12" sm="12" md="12" lg="12" xl="12">
                <Row className="rounded rounded-3 mr-1">
                  <FormGroup tag={Col} xs={6} sm={6} md={4} lg={4} xl={4}>
                    <Label for="date">Date</Label>
                    <Input
                      type="date"
                      name="date"
                      id="date"
                      placeholder="Date"
                      innerRef={register({ required: true })}
                      invalid={errors.date && true}
                      className={classnames({ 'is-invalid': errors['date'] })}
                    />
                    {errors && errors.date && <FormFeedback>Date!</FormFeedback>}
                  </FormGroup>
                  <FormGroup tag={Col} xs={6} sm={6} md={4} lg={4} xl={4}>
                    <Label for="zoneOwnerName">Zone Owner</Label>
                    <Select
                      id="zoneOwnerName"
                      isSearchable
                      isClearable
                      theme={selectThemeColors}
                      options={zoneOwnerNameData}
                      classNamePrefix="select"
                      value={zoneOwner}
                      onChange={data => {
                        setZoneOwner(data);
                      }}
                    />
                    {errors && errors.zoneOwnerName && (
                      <FormFeedback>Zone Owner Name is Required!</FormFeedback>
                    )}
                  </FormGroup>
                  <FormGroup tag={Col} xs={6} sm={6} md={4} lg={4} xl={4}>
                    <Label for="line">Line</Label>
                    <CreatableSelect
                      isMulti
                      id="line"
                      isSearchable
                      isClearable
                      bsSize="sm"
                      theme={selectThemeColors}
                      options={lineData}
                      classNamePrefix="select"
                      value={line}
                      onChange={data => {
                        setLine(data);
                      }}
                    />
                    {errors && errors.line && <FormFeedback>Line is Required!</FormFeedback>}
                  </FormGroup>
                  <FormGroup tag={Col} xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Label for="machineCount">Machine Count</Label>
                    <Input
                      name="machineCount"
                      id="machineCount"
                      placeholder="Machine Count"
                      innerRef={register({ required: true })}
                      invalid={errors.machineCount && true}
                      className={classnames({ 'is-invalid': errors['machineCount'] })}
                    />
                    {errors && errors.machineCount && <FormFeedback>Machine Count!</FormFeedback>}
                  </FormGroup>
                  <FormGroup tag={Col} xs={12} sm={12} md={6} lg={6} xl={6}>
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

export default AssignInputTableInfo;

/** Change Log
 * 26-Jan-2022(Iqbal): Assign Input Table info modal create
 */
