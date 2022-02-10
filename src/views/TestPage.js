import React from 'react';
import { Col, Row } from 'reactstrap';
import ItemSegmentValueAddForm from './inventory/item-segment-value/form/ItemSegmentValueAddForm';
import ItemSegmentAddForm from './inventory/item-segment/form/ItemSegmentAddForm';
import ItemAddForm from './inventory/item/form/ItemAddForm';

const TestPage = () => {
  return (
    <>
      <Row>
        <Col>
          <ItemSegmentAddForm />
        </Col>
        <Col>
          <ItemSegmentValueAddForm />
        </Col>
      </Row>
      <Row>
        <Col>
          <ItemAddForm />
        </Col>
        <Col>{/* <ItemSegmentNewForm /> */}</Col>
      </Row>
    </>
  );
};

export default TestPage;
