/*
   Title: Edit page for Critical Process
   Description: Edit page for Critical Process
   Author: Nasir Ahmed
   Date: 11-January-2022
   Modified: 11-January-2022
*/

import Sidebar from '@core/components/sidebar';
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import FormFeedback from 'reactstrap/lib/FormFeedback';
import { isObjEmpty, selectThemeColors } from 'utility/Utils';
import { toggleCritcalProcessStatus, updateCriticalProcess } from '../store/actions';

const CriticalProcessTypeDDL = [
  { value: 'Partial', label: 'Partial' },
  { value: 'Complete', label: 'Complete' }
];

const CriticalProcessEditForm = props => {
  // eslint-disable-next-line no-unused-vars
  const { open, toggleSidebar, data, lastPageInfo } = props;
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();

  //#region State
  const [criticalProcessType, setCriticalProcessType] = useState(null);
  //#endregion

  const { register, errors, handleSubmit } = useForm();

  //#region Effect
  useEffect(() => {
    if (data) {
      const selectedProcessType = CriticalProcessTypeDDL.find(
        item => item.value === data.processType
      );
      setCriticalProcessType(selectedProcessType);
    }
  }, [data]);
  //#endregion

  const onSubmit = values => {
    if (isObjEmpty(errors)) {
      toggleSidebar();
      dispatch(
        updateCriticalProcess(
          {
            id: data.id,
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
      title="Edit Critical Process"
      style={{ transition: '0.5s all ease' }}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="lineNumber">Process Name</Label>
          <Input
            name="processName"
            id="processName"
            placeholder="Process Name"
            defaultValue={data.processName}
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
            value={criticalProcessType}
            onChange={item => setCriticalProcessType(item)}
          />
          {errors && errors.description && <FormFeedback>Description is Required!</FormFeedback>}
        </FormGroup>

        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            name="description"
            id="description"
            placeholder="Description"
            defaultValue={data.description}
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
              checked={data.status === 'active' ? true : false}
              onChange={e =>
                dispatch(toggleCritcalProcessStatus(e.target.checked ? 'active' : 'inactive'))
              }
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

export default CriticalProcessEditForm;
