/*
   Title: Process Form
   Description: Form page for Process
   Author: Iqbal Hossain
   Date: 21-November-2021
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
import {
  toggleProductionProcessSidebar,
  toggleProductionProcessStatus,
  updateProductionProcess
} from '../store/actions';

const ProductionProcessEditForm = props => {
  const { open, data, lastPageInfo } = props;
  const dispatch = useDispatch();
  const { isOpenSidebar } = useSelector(({ productionProcessReducer }) => productionProcessReducer);

  const { register, errors, handleSubmit } = useForm();

  const onSubmit = values => {
    if (isObjEmpty(errors)) {
      dispatch(toggleProductionProcessSidebar(!isOpenSidebar));
      dispatch(
        updateProductionProcess(
          {
            id: data.id,
            productionProcessName: values.productionProcessName,
            processType: values.processType,
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
      title="Edit Production Process"
      style={{ transition: '0.5s all ease' }}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={() => dispatch(toggleProductionProcessSidebar(!isOpenSidebar))}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="productionProcessName">
            <span>Production Process Name</span>
          </Label>
          <Input
            name="productionProcessName"
            id="productionProcessName"
            placeholder="Production Process"
            defaultValue={data.productionProcessName}
            innerRef={register({ required: true })}
            invalid={errors.productionProcessName && true}
            className={classnames({ 'is-invalid': errors['productionProcessName'] })}
          />
          {errors && errors.productionProcessName && (
            <FormFeedback>Production Process is Required!</FormFeedback>
          )}
        </FormGroup>
        <FormGroup>
          <Label for="processType">
            <span> Process Type</span>
          </Label>
          <Input
            name="processType"
            id="processType"
            placeholder="Process Type"
            defaultValue={data.processType}
            innerRef={register({ required: true })}
            invalid={errors.processType && true}
            className={classnames({ 'is-invalid': errors['processType'] })}
          />
          {errors && errors.processType && <FormFeedback>Process Type is Required!</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label for="description">
            <span>Description</span>
          </Label>
          <Input
            name="description"
            id="description"
            placeholder="Description"
            defaultValue={data.description}
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
              checked={data.status === 'active' ? true : false}
              onChange={e =>
                dispatch(toggleProductionProcessStatus(e.target.checked ? 'active' : 'inactive'))
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
        <Button.Ripple
          type="cancel"
          color="danger"
          outline
          onClick={() => dispatch(toggleProductionProcessSidebar(!isOpenSidebar))}
        >
          Cancel
        </Button.Ripple>
      </Form>
    </Sidebar>
  );
};

export default ProductionProcessEditForm;
