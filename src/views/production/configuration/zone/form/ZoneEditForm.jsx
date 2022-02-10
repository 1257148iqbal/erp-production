/*
     Title: Zone Edit Form
     employeeCode: Zone Edit Form
     Author: Iqbal Hossain
     Date: 09-January-2022
     Modified: 09-January-2022
*/

import Sidebar from '@core/components/sidebar';
import classnames from 'classnames';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import FormFeedback from 'reactstrap/lib/FormFeedback';
import { isObjEmpty } from 'utility/Utils';
import { toggleZoneSidebar, toggleZoneStatus, updateZone } from '../store/actions';

const ZoneEditForm = props => {
  const { open, data, lastPageInfo } = props;
  const dispatch = useDispatch();
  //Reducer for Sidebar
  const { isOpenSidebar } = useSelector(({ zoneReducer }) => zoneReducer);

  const { register, errors, handleSubmit } = useForm();

  const onSubmit = values => {
    if (isObjEmpty(errors)) {
      dispatch(toggleZoneSidebar(!isOpenSidebar));
      dispatch(
        updateZone(
          {
            id: data.id,
            zoneOwnerName: values.zoneOwnerName,
            employeeCode: values.employeeCode,
            phoneNumber: values.phoneNumber,
            status: values.status ? 'active' : 'inactive'
          },
          lastPageInfo
        )
      );
    }
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="Edit Zone Owner"
      style={{ transition: '0.5s all ease' }}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={() => dispatch(toggleZoneSidebar(!isOpenSidebar))}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="zoneOwnerName">
            <span>Zone Owner Name</span>
          </Label>
          <Input
            name="zoneOwnerName"
            id="zoneOwnerName"
            placeholder="Zone Owner Name"
            defaultValue={data.zoneOwnerName}
            innerRef={register({ required: true })}
            invalid={errors.zoneOwnerName && true}
            className={classnames({ 'is-invalid': errors['zoneOwnerName'] })}
          />
          {errors && errors.zoneOwnerName && <FormFeedback>Zone Owner is Required!</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label for="employeeCode">
            <span>Employee Code</span>
          </Label>
          <Input
            name="employeeCode"
            id="employeeCode"
            placeholder="Employee Code"
            defaultValue={data.employeeCode}
            innerRef={register({ required: true })}
            invalid={errors.employeeCode && true}
            className={classnames({ 'is-invalid': errors['employeeCode'] })}
          />
          {errors && errors.employeeCode && <FormFeedback>Employee Code is Required!</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label for="phoneNumber">
            <span>Phone Number</span>
          </Label>
          <Input
            name="phoneNumber"
            id="phoneNumber"
            placeholder="phoneNumber"
            defaultValue={data.phoneNumber}
            innerRef={register({ required: true })}
            invalid={errors.phoneNumber && true}
            className={classnames({ 'is-invalid': errors['phoneNumber'] })}
          />
          {errors && errors.phoneNumber && <FormFeedback>Phone Number is Required!</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label for="status">
            <Input
              style={{ marginLeft: '5px' }}
              name="status"
              type="checkbox"
              innerRef={register({ required: false })}
              checked={data.status === 'active' ? true : false}
              onChange={e => dispatch(toggleZoneStatus(e.target.checked ? 'active' : 'inactive'))}
            />
            <span style={{ marginLeft: '25px' }}> Is Active </span>
          </Label>
        </FormGroup>

        <Button.Ripple type="submit" className="mr-1" color="primary">
          Submit
        </Button.Ripple>
        <Button.Ripple type="reset" className="mr-1" outline color="secondary">
          Reset
        </Button.Ripple>
        <Button.Ripple
          type="cancel"
          color="danger"
          outline
          onClick={() => dispatch(toggleZoneSidebar(!isOpenSidebar))}
        >
          Cancel
        </Button.Ripple>
      </Form>
    </Sidebar>
  );
};

export default ZoneEditForm;
