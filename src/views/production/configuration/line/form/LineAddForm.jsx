/**
 * Title: Line Form
 * Description: Form page for Line
 * Author: Nasir Ahmed
 * Date: 21-November-2021
 * Modified: 21-November-2021
 */

import Sidebar from '@core/components/sidebar';
import classnames from 'classnames';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import FormFeedback from 'reactstrap/lib/FormFeedback';
import { isObjEmpty } from 'utility/Utils';
import { addLine, toggleLineSidebar } from '../store/actions';

const LineAddForm = props => {
  const { open, lastPageInfo } = props;
  const dispatch = useDispatch();
  const { isOpenSidebar } = useSelector(({ lineReducer }) => lineReducer);

  const { register, errors, handleSubmit } = useForm();

  //Submit method for data save
  const onSubmit = values => {
    if (isObjEmpty(errors)) {
      dispatch(toggleLineSidebar(!isOpenSidebar));
      dispatch(
        addLine(
          {
            lineNumber: values.lineNumber,
            description: values.description,
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
      title="New Line"
      style={{ transition: '0.5s all ease' }}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={() => dispatch(toggleLineSidebar(!isOpenSidebar))}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="lineNumber">
            <span>Line Number</span>
          </Label>
          <Input
            name="lineNumber"
            id="lineNumber"
            placeholder="Line Name"
            innerRef={register({ required: true })}
            invalid={errors.lineNumber && true}
            className={classnames({ 'is-invalid': errors['lineNumber'] })}
          />
          {errors && errors.lineNumber && <FormFeedback>Line Number is Required!</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label for="description">
            <span>Description</span>
          </Label>
          <Input
            name="description"
            id="description"
            placeholder="Description"
            innerRef={register({ required: true })}
            invalid={errors.description && true}
            className={classnames({ 'is-invalid': errors['description'] })}
          />
          {errors && errors.description && <FormFeedback>Description is Required!</FormFeedback>}
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
          onClick={() => dispatch(toggleLineSidebar(!isOpenSidebar))}
        >
          Cancel
        </Button.Ripple>
      </Form>
    </Sidebar>
  );
};

export default LineAddForm;
