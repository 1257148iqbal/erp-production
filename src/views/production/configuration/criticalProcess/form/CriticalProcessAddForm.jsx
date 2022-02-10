/**
 * Title: Line Form
 * Description: Form page for Line
 * Author: Nasir Ahmed
 * Date: 21-November-2021
 * Modified: 21-November-2021
 */

import Sidebar from '@core/components/sidebar';
import classnames from 'classnames';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import FormFeedback from 'reactstrap/lib/FormFeedback';
import { isObjEmpty, selectThemeColors } from 'utility/Utils';
import { addCriticalProcess } from '../store/actions';

const CriticalProcessTypeDDL = [
  { value: 'Partial', label: 'Partial' },
  { value: 'Complete', label: 'Complete' }
];

const LineAddForm = props => {
  const { open, toggleSidebar, lastPageInfo } = props;
  const dispatch = useDispatch();

  const { register, errors, handleSubmit } = useForm();

  //#region State
  const [criticalProcess, setCriticalProcess] = useState(null);
  //#endregion

  //Submit method for data save
  const onSubmit = values => {
    if (isObjEmpty(errors)) {
      toggleSidebar();
      dispatch(
        addCriticalProcess(
          {
            processName: values.processName,
            processType: criticalProcess.value,
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
      title="New Critical Process"
      style={{ transition: '0.5s all ease' }}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <FormGroup>
          <Label for="lineNumber">Process Name</Label>
          <Input
            name="processName"
            id="processName"
            placeholder="Process Name"
            innerRef={register({ required: true })}
            invalid={errors.processName && true}
            className={classnames({ 'is-invalid': errors['processName'] })}
          />
          {errors && errors.processName && <FormFeedback>Process name is Required!</FormFeedback>}
        </FormGroup>

        <FormGroup>
          <Label for="processType">Process Type</Label>
          <Select
            name="processType"
            id="role"
            isSearchable
            isClearable
            theme={selectThemeColors}
            options={CriticalProcessTypeDDL}
            classNamePrefix="select"
            innerRef={register({ required: true })}
            value={criticalProcess}
            onChange={item => setCriticalProcess(item)}
          />
          {errors && errors.description && <FormFeedback>Description is Required!</FormFeedback>}
        </FormGroup>

        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            name="description"
            id="description"
            placeholder="Description"
            innerRef={register({ required: false })}
            invalid={errors.description && true}
            className={classnames({ 'is-invalid': errors['description'] })}
          />
          {errors && errors.processName && <FormFeedback>Process name is Required!</FormFeedback>}
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
        <Button.Ripple type="cancel" color="danger" outline onClick={toggleSidebar}>
          Cancel
        </Button.Ripple>
      </Form>
    </Sidebar>
  );
};

export default LineAddForm;
