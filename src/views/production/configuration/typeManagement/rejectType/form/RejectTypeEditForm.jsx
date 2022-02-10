/**
 * Title: RejectType Edit Form
 * productionProcess: RejectType Edit Form
 * Author: Iqbal Hossain
 * Date: 05-January-2022
 * Modified: 10-January-2022
 */

import Sidebar from '@core/components/sidebar';
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import FormFeedback from 'reactstrap/lib/FormFeedback';
import { isObjEmpty, selectThemeColors } from 'utility/Utils';
import { getDropDownProductinProcess } from 'views/production/configuration/productionProcess/store/actions';
import {
  toggleRejectTypeSidebar,
  toggleRejectTypeStatus,
  updateRejectType
} from '../store/actions';

const RejectTypeEditForm = props => {
  const { open, data, lastPageInfo } = props;
  const dispatch = useDispatch();

  //Reducer for Sidebar
  const { isOpenSidebar } = useSelector(({ rejectTypeReducer }) => rejectTypeReducer);

  const { dropDownItems } = useSelector(({ productionProcessReducer }) => productionProcessReducer);

  //#region State
  const [productionProcess, setProductionProcess] = useState();
  //#endregion

  const { register, errors, handleSubmit } = useForm();

  //#region Effect
  useEffect(() => {
    dispatch(getDropDownProductinProcess());
    if (dropDownItems.length) {
      const filterPP = dropDownItems?.find(item => item.label === data.productionProcess);
      setProductionProcess(filterPP);
    }
  }, [dispatch, dropDownItems.length]);
  //#endregion

  const onSubmit = values => {
    if (isObjEmpty(errors)) {
      dispatch(toggleRejectTypeSidebar(!isOpenSidebar));
      dispatch(
        updateRejectType(
          {
            id: data.id,
            rejectTypeName: values.rejectTypeName,
            productionProcess: productionProcess.label,
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
      title="Edit Reject Type"
      style={{ transition: '0.5s all ease' }}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={() => dispatch(toggleRejectTypeSidebar(!isOpenSidebar))}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="rejectTypeName">
            <span>Reject Type Name</span>
          </Label>
          <Input
            name="rejectTypeName"
            id="rejectTypeName"
            placeholder="Reject Type"
            defaultValue={data.rejectTypeName}
            innerRef={register({ required: true })}
            invalid={errors.rejectTypeName && true}
            className={classnames({ 'is-invalid': errors['rejectTypeName'] })}
          />
          {errors && errors.rejectTypeName && <FormFeedback>Reject Type is Required!</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label for="productionProcess">
            <span>Production Process</span>
          </Label>
          <Select
            id="productionProcess"
            isSearchable
            isClearable
            theme={selectThemeColors}
            options={dropDownItems}
            classNamePrefix="select"
            innerRef={register({ required: true })}
            value={productionProcess}
            onChange={data => {
              setProductionProcess(data);
            }}
          />
          {errors && errors.productionProcess && (
            <FormFeedback>Production Process is Required!</FormFeedback>
          )}
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
                dispatch(toggleRejectTypeStatus(e.target.checked ? 'active' : 'inactive'))
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
          onClick={() => dispatch(toggleRejectTypeSidebar(!isOpenSidebar))}
        >
          Cancel
        </Button.Ripple>
      </Form>
    </Sidebar>
  );
};

export default RejectTypeEditForm;
