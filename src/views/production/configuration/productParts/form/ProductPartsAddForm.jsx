/**
 * Title: Product Part add form
 * shortName: Product Part add form
 * Author: Nasir Ahmed
 * Date: 10-January-2022
 * Modified: 10-January-2022
 **/

import Sidebar from '@core/components/sidebar';
import classnames from 'classnames';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import FormFeedback from 'reactstrap/lib/FormFeedback';
import { isObjEmpty } from 'utility/Utils';
import { addProductPart, toggleProductPartSidebar } from '../store/actions';

const ProductPartAddForm = props => {
  const { open, lastPageInfo } = props;
  const dispatch = useDispatch();
  const { isOpenSidebar } = useSelector(({ productPartReducer }) => productPartReducer);

  const { register, errors, handleSubmit } = useForm();

  //Submit method for data save
  const onSubmit = values => {
    if (isObjEmpty(errors)) {
      dispatch(toggleProductPartSidebar(!isOpenSidebar));
      dispatch(
        addProductPart(
          {
            name: values.name,
            shortName: values.shortName,
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
      title="New Product Parts"
      style={{ transition: '0.5s all ease' }}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={() => dispatch(toggleProductPartSidebar(!isOpenSidebar))}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="name">Product Parts Number</Label>
          <Input
            name="name"
            id="name"
            placeholder="Product Parts Name"
            innerRef={register({ required: true })}
            invalid={errors.name && true}
            className={classnames({ 'is-invalid': errors['name'] })}
          />
          {errors && errors.name && <FormFeedback>Product Parts is Required!</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label for="shortName">Short Name</Label>
          <Input
            name="shortName"
            id="shortName"
            placeholder="shortName"
            innerRef={register({ required: true })}
            invalid={errors.shortName && true}
            className={classnames({ 'is-invalid': errors['shortName'] })}
          />
          {errors && errors.shortName && <FormFeedback>Short Name is Required!</FormFeedback>}
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
          onClick={() => dispatch(toggleProductPartSidebar(!isOpenSidebar))}
        >
          Cancel
        </Button.Ripple>
      </Form>
    </Sidebar>
  );
};

export default ProductPartAddForm;
