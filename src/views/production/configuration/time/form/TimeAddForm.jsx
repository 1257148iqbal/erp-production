/**
 * Title: Time Add Form
 * fromTime: Time Add Form
 * Author: Iqbal Hossain
 * Date: 05-January-2022
 * Modified: 11-January-2022
 */

import Sidebar from '@core/components/sidebar';
import classnames from 'classnames';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import FormFeedback from 'reactstrap/lib/FormFeedback';
import { isObjEmpty } from 'utility/Utils';
import { addTime, toggleTimeSidebar } from '../store/actions';

const TimeAddForm = props => {
  const { open, lastPageInfo } = props;
  const dispatch = useDispatch();

  // Reducer for Sidebar
  const { isOpenSidebar } = useSelector(({ timeReducer }) => timeReducer);

  const { register, errors, handleSubmit } = useForm();

  //Submit method for data save
  const onSubmit = values => {
    if (isObjEmpty(errors)) {
      dispatch(toggleTimeSidebar(!isOpenSidebar));
      dispatch(
        addTime(
          {
            name: values.name,
            fromTime: values.fromTime,
            toTime: values.toTime,
            duration: values.duration,
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
      title="New Time"
      style={{ transition: '0.5s all ease' }}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={() => dispatch(toggleTimeSidebar(!isOpenSidebar))}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="name">
            <span>Name</span>
          </Label>
          <Input
            name="name"
            id="name"
            placeholder="Name"
            innerRef={register({ required: true })}
            invalid={errors.name && true}
            className={classnames({ 'is-invalid': errors['name'] })}
          />
          {errors && errors.name && <FormFeedback>Name is Required!</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label for="fromTime">
            <span>From Time</span>
          </Label>
          <Input
            name="fromTime"
            type="time"
            id="fromTime"
            placeholder="From Time"
            innerRef={register({ required: true })}
            invalid={errors.fromTime && true}
            className={classnames({ 'is-invalid': errors['fromTime'] })}
          />
          {errors && errors.fromTime && <FormFeedback>From Time is Required!</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label for="toTime">
            <span>To Time</span>
          </Label>
          <Input
            name="toTime"
            type="time"
            id="toTime"
            placeholder="To Time"
            innerRef={register({ required: true })}
            invalid={errors.toTime && true}
            className={classnames({ 'is-invalid': errors['toTime'] })}
          />
          {errors && errors.toTime && <FormFeedback>To Time is Required!</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label for="duration">
            <span>Duration</span>
          </Label>
          <Input
            name="duration"
            id="duration"
            placeholder="Duration"
            innerRef={register({ required: true })}
            invalid={errors.duration && true}
            className={classnames({ 'is-invalid': errors['duration'] })}
          />
          {errors && errors.duration && <FormFeedback>Duration is Required!</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label for="status">
            <Input
              style={{ marginLeft: '5px' }}
              name="status"
              type="checkbox"
              innerRef={register({ required: false })}
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
          onClick={() => dispatch(toggleTimeSidebar(!isOpenSidebar))}
        >
          Cancel
        </Button.Ripple>
      </Form>
    </Sidebar>
  );
};

export default TimeAddForm;
