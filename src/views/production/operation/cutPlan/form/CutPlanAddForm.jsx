/**
 * Title: Cut Plan Add Form
 * Description: Cut Plan Add Form
 * Author: Iqbal Hossain
 * Date: 05-January-2022
 * Modified: 26-January-2022
 */

import ActionMenu from 'layouts/components/menu/action-menu';
import moment from 'moment';
import React, { Fragment, useState } from 'react';
import { Maximize2, Minimize2, MoreVertical } from 'react-feather';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Collapse,
  CustomInput,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  NavItem,
  NavLink,
  Row,
  Table
} from 'reactstrap';
import { notify } from 'utility/custom/notifications';
import { randomIdGenerator, selectThemeColors } from 'utility/Utils';
import classes from '../styles/CutPlanAddForm.module.scss';
import SizeRatioDetails from './SizeRatioDetails';

const dropDownStyle = [
  { value: 'AV56567', label: 'AV56567' },
  { value: 'AV1873', label: 'AV1873' },
  { value: 'M7825', label: 'M7825' }
];

const CutPlanAddForm = () => {
  const { register, errors } = useForm();
  const { replace } = useHistory();

  //#region State
  const [masterInfo, setMasterInfo] = useState({
    cutPlanNo: '',
    startDate: '',
    style: '',
    styleCategory: '',
    BuyerName: '',
    totalQty: '',
    totalLayCount: '',
    layPerCut: ''
  });
  const [sizeInfo, setSizeInfo] = useState({
    length: 0,
    width: 0,
    total: 0,
    sizesDetails: [
      {
        id: 's1',
        size: 'S',
        quantity: 0
      },
      {
        id: 's2',
        size: 'M',
        quantity: 0
      },
      {
        id: 's3',
        size: 'L',
        quantity: 0
      }
    ]
  });
  const [orderDetails, setOrderDetails] = useState([
    {
      fieldId: randomIdGenerator(),
      poNo: 'PO101',
      destination: 'Finland',
      inspectionDate: moment(new Date()).format('yy-MM-DD'),
      shipmentMode: 'Air',
      shipmentDate: moment(new Date()).format('yy-MM-DD'),
      orderQuantity: 5000,
      orderUOM: 'pc',
      excessQuantity: 0,
      wastageQuantity: 0,
      isOpen: true,
      poDetails: [
        {
          fieldId: randomIdGenerator(),
          color: 'Red',
          orderQuantity: 2000,
          extra: 0,
          withExtra: 2000,
          previousQty: 0,
          layCount: 0,
          cutQuantity: 0,
          balance: 2000,
          isChecked: false,
          hasError: false
        },
        {
          fieldId: randomIdGenerator(),
          color: 'Green',
          orderQuantity: 3000,
          extra: 0,
          withExtra: 3000,
          previousQty: 0,
          layCount: 0,
          cutQuantity: 0,
          balance: 3000,
          isChecked: false,
          hasError: false
        }
      ]
    },
    {
      fieldId: randomIdGenerator(),
      poNo: 'PO102',
      destination: 'Denmark',
      inspectionDate: moment(new Date()).format('yy-MM-DD'),
      shipmentMode: 'Air',
      shipmentDate: moment(new Date()).format('yy-MM-DD'),
      orderQuantity: 7000,
      orderUOM: 'pc',
      excessQuantity: 0,
      wastageQuantity: 0,
      isOpen: true,
      isChecked: false,
      poDetails: [
        {
          fieldId: randomIdGenerator(),
          color: 'Red',
          orderQuantity: 3500,
          extra: 0,
          withExtra: 3500,
          previousQty: 1200,
          layCount: 0,
          cutQuantity: 0,
          balance: 2300,
          isChecked: false,
          hasError: false
        },
        {
          fieldId: randomIdGenerator(),
          color: 'Green',
          orderQuantity: 3500,
          extra: 0,
          withExtra: 3500,
          previousQty: 2400,
          layCount: 0,
          cutQuantity: 0,
          balance: 1100,
          isChecked: false,
          hasError: false
        }
      ]
    }
  ]);

  const [sizeRatioModal, setSizeRatioModal] = useState(false);
  //#endregion

  //#region UDF's
  const togglePoDetails = idx => {
    const _orderDetails = [...orderDetails];
    const clickedItem = _orderDetails[idx];
    clickedItem.isOpen = !clickedItem.isOpen;
    _orderDetails[idx] = clickedItem;
    setOrderDetails(_orderDetails);
  };

  const toggleCheck = (e, odIdx, podIdx) => {
    const { checked } = e.target;
    const _orderDetails = [...orderDetails];
    const clickedItem = _orderDetails[odIdx];
    const _podetails = [...clickedItem.poDetails];
    const checkedItem = { ..._podetails[podIdx] };
    const cloneCheckedItem = { ..._podetails[podIdx] };
    checkedItem.isChecked = checked;

    if (!checked) {
      setMasterInfo({
        ...masterInfo,
        totalQty: masterInfo.totalQty - checkedItem.cutQuantity,
        totalLayCount: masterInfo.totalLayCount - checkedItem.layCount
      });
      checkedItem.extra = 0;
      checkedItem.withExtra = cloneCheckedItem.orderQuantity;
      checkedItem.cutQuantity = 0;
      checkedItem.layCount = 0;
      checkedItem.balance = cloneCheckedItem.orderQuantity - cloneCheckedItem.previousQty;
    }
    _podetails[podIdx] = checkedItem;
    _orderDetails[odIdx] = { ...clickedItem, poDetails: _podetails };

    setOrderDetails(_orderDetails);
  };
  //#endregion

  //#region Events
  const onExtraPercentageChange = (e, odIdx, podIdx) => {
    const _orderDetails = [...orderDetails];
    const clickedItem = _orderDetails[odIdx];
    const _podetails = [...clickedItem.poDetails];
    const checkedItem = _podetails[podIdx];
    checkedItem.extra = e.target.value;
    checkedItem.withExtra =
      checkedItem.orderQuantity + (checkedItem.orderQuantity * checkedItem.extra) / 100;
    const _balanceQty = checkedItem.withExtra - (checkedItem.previousQty + checkedItem.cutQuantity);
    checkedItem.balance = _balanceQty;
    _podetails[podIdx] = checkedItem;
    _orderDetails[odIdx] = { ...clickedItem, poDetails: _podetails };
    setOrderDetails(_orderDetails);
  };

  const onOutQuantityChange = (e, odIdx, podIdx) => {
    const { value } = e.target;
    // introduce a copy of original order details
    const _orderDetails = [...orderDetails];
    // find parent row
    const clickedItem = _orderDetails[odIdx];
    // introduce a copy of original po details
    const _podetails = [...clickedItem.poDetails];
    // find child row of parent row
    const checkedItem = _podetails[podIdx];
    // mutate data of child row
    let _cutQty = value ? +value : 0;
    checkedItem.hasError = false;
    if (_cutQty > checkedItem.withExtra - checkedItem.previousQty) {
      //notify('warning', 'Quantity exceeded!!!');
      checkedItem.hasError = !checkedItem.hasError;
      _cutQty = 0;
    }
    const _laycout = Number.isInteger(_cutQty / sizeInfo.total) ? _cutQty / sizeInfo.total : 0;
    checkedItem.cutQuantity = _cutQty;
    checkedItem.layCount = _laycout;

    const _balanceQty = checkedItem.withExtra - (checkedItem.previousQty + checkedItem.cutQuantity);
    checkedItem.balance = _balanceQty;

    // replace chlid row with new one
    _podetails[podIdx] = checkedItem;
    // replace po details obj with new one
    _orderDetails[odIdx] = { ...clickedItem, poDetails: _podetails };

    // get an arry with all selected child elements
    const checkedItems = _orderDetails
      .reduce((acc, curr) => {
        curr.poDetails.map(po => acc.push(po));
        return acc;
      }, [])
      .filter(item => item.isChecked);

    let totalLayCount = 0;
    let totalQuantity = 0;
    for (let i = 0; i < checkedItems.length; i++) {
      const item = checkedItems[i];
      totalLayCount += item.layCount;
      totalQuantity += item.cutQuantity;
    }

    setOrderDetails(_orderDetails);
    setMasterInfo({ ...masterInfo, totalLayCount: totalLayCount, totalQty: totalQuantity });
  };

  const onSizeQuantityChange = (e, sizeIndex) => {
    const { value } = e.target;
    const _sizes = [...sizeInfo.sizesDetails];
    const selectedSize = _sizes[sizeIndex];
    selectedSize.quantity = value;
    _sizes[sizeIndex] = selectedSize;

    setSizeInfo({
      ...sizeInfo,
      sizesDetails: _sizes,

      total: _sizes.reduce((acc, curr) => {
        acc += +curr.quantity;
        return acc;
      }, 0)
    });

    const resetedPoDetails = [...orderDetails].map(od => {
      od.poDetails.map(pod => {
        if (pod.isChecked) {
          pod.cutQuantity = 0;
          pod.layCount = 0;
          pod.balance = pod.withExtra - pod.previousQty;
        }
        return pod;
      });
      return od;
    });
    setOrderDetails(resetedPoDetails);

    setMasterInfo({ ...masterInfo, totalLayCount: 0, totalQty: 0 });
  };

  const onFocusCutQuantity = () => {
    if (!sizeInfo.total) {
      notify('warning', 'Size info not found!!!');
    }
  };

  // Size Ration Modal Toggle Open
  const hanldeSizeRatioModalToggle = () => {
    setSizeRatioModal(!sizeRatioModal);
  };
  //#endregion

  return (
    <div>
      <Card className="p-1 mt-3">
        <CardBody>
          <Form onSubmit={e => e.preventDefault()}>
            <ActionMenu title="New Cut Plan">
              <NavItem className="mr-1">
                <NavLink tag={Button} size="sm" color="primary" type="submit">
                  Save
                </NavLink>
              </NavItem>
              <NavItem className="mr-1">
                <NavLink
                  tag={Button}
                  size="sm"
                  color="secondary"
                  onClick={() => {
                    replace('/cut-plan');
                  }}
                >
                  Cancel
                </NavLink>
              </NavItem>
            </ActionMenu>
            <Row>
              <Col xs="12" sm="12" md="12" lg="6" xl="6">
                <Row className="border rounded rounded-3 mr-1">
                  <FormGroup tag={Col} xs={12} sm={12} md={12} lg={12} xl={12} className="mt-n1">
                    <Badge color="primary">{`Master Info`}</Badge>
                  </FormGroup>
                  <FormGroup tag={Col} xs="6">
                    <Label className="text-dark font-weight-bold" for="cutPlanNo">
                      Cut Plan No
                    </Label>
                    <Input
                      id="cutPlanNo"
                      type="text"
                      name="cutPlanNo"
                      placeholder="Cut Plan No"
                      innerRef={register({ required: true })}
                      invalid={errors.cutPlanNo && true}
                    />
                    {errors && errors.cutPlanNo && (
                      <FormFeedback>Cut Plan No is required!</FormFeedback>
                    )}
                  </FormGroup>
                  <FormGroup tag={Col} xs="6">
                    <Label className="text-dark font-weight-bold" for="startDate">
                      Start Date
                    </Label>
                    <Input
                      id="startDate"
                      type="time"
                      name="startDate"
                      placeholder="Start Date"
                      innerRef={register({ required: true })}
                      invalid={errors.startDate && true}
                    />
                    {errors && errors.startDate && (
                      <FormFeedback>Start Date is required!</FormFeedback>
                    )}
                  </FormGroup>
                  <FormGroup tag={Col} xs="6">
                    <Label className="text-dark font-weight-bold" for="style">
                      Style
                    </Label>
                    <Select
                      id="buyerName"
                      isSearchable
                      bsSize="sm"
                      isClearable
                      theme={selectThemeColors}
                      options={dropDownStyle}
                      classNamePrefix="select"
                      onChange={() => {}}
                      innerRef={register({ required: true })}
                    />

                    {errors && errors.style && <FormFeedback>Style is required!</FormFeedback>}
                  </FormGroup>
                  <FormGroup tag={Col} xs="6">
                    <Label className="text-dark font-weight-bold" for="styleCategory">
                      Style Category
                    </Label>
                    <Input
                      id="styleCategory"
                      type="text"
                      name="styleCategory"
                      placeholder="Style Category"
                      disabled
                      innerRef={register({ required: true })}
                      invalid={errors.styleCategory && true}
                    />
                    {errors && errors.styleCategory && (
                      <FormFeedback>Style Category is required!</FormFeedback>
                    )}
                  </FormGroup>
                  <FormGroup tag={Col} xs="6">
                    <Label className="text-dark font-weight-bold" for="buyerName">
                      Buyer Name
                    </Label>
                    <Input
                      id="buyerName"
                      type="text"
                      name="buyerName"
                      placeholder="Buyer Name"
                      disabled
                      innerRef={register({ required: true })}
                      invalid={errors.buyerName && true}
                    />
                    {errors && errors.buyerName && (
                      <FormFeedback>Buyer Name is required!</FormFeedback>
                    )}
                  </FormGroup>
                  <FormGroup tag={Col} xs="6">
                    <Label className="text-dark font-weight-bold" for="totalQty">
                      Total Quanity
                    </Label>
                    <Input
                      id="totalQty"
                      type="text"
                      name="totalQty"
                      placeholder="Total Quanity"
                      value={masterInfo.totalQty}
                      readOnly
                      innerRef={register({ required: true })}
                      invalid={errors.totalQty && true}
                    />
                    {errors && errors.totalQty && (
                      <FormFeedback>Total Quanity is required!</FormFeedback>
                    )}
                  </FormGroup>
                  <FormGroup tag={Col} xs="6">
                    <Label className="text-dark font-weight-bold" for="totalLayCount">
                      Total Lay Count
                    </Label>
                    <Input
                      id="totalLayCount"
                      type="text"
                      name="totalLayCount"
                      placeholder="Total Lay Count"
                      value={masterInfo.totalLayCount}
                      readOnly
                      innerRef={register({ required: true })}
                      invalid={errors.totalLayCount && true}
                    />
                    {errors && errors.totalLayCount && (
                      <FormFeedback>Total Lay Count is required!</FormFeedback>
                    )}
                  </FormGroup>
                  <FormGroup tag={Col} xs="6">
                    <Label className="text-dark font-weight-bold" for="layPerCut">
                      Lay Per Cut
                    </Label>
                    <Input
                      id="layPerCut"
                      type="text"
                      name="layPerCut"
                      placeholder="Lay Per Cut"
                      innerRef={register({ required: true })}
                      invalid={errors.layPerCut && true}
                    />
                    {errors && errors.layPerCut && (
                      <FormFeedback>Lay Per Cut is required!</FormFeedback>
                    )}
                  </FormGroup>
                </Row>
              </Col>

              <Col xs="12" sm="12" md="12" lg="6" xl="6">
                <Row className="border rounded rounded-3">
                  <FormGroup tag={Col} xs={12} sm={12} md={12} lg={12} xl={12} className="mt-n1">
                    <Badge color="primary">{`Size Wise Ratio`}</Badge>
                  </FormGroup>
                  <FormGroup tag={Col} xs="6">
                    <Input type="button" value="Size" disabled />
                  </FormGroup>
                  <FormGroup tag={Col} xs="6">
                    <Input type="button" value="Quantity" disabled />
                  </FormGroup>
                  {/*  */}
                  {sizeInfo.sizesDetails.map((s, sizeIdx) => (
                    <Fragment key={s.id}>
                      <FormGroup tag={Col} xs="6">
                        <Input type="text" defaultValue={s.size} className="text-center" disabled />
                      </FormGroup>
                      <FormGroup tag={Col} xs="6">
                        <Input
                          id={`style-size-${s.id}`}
                          type="number"
                          name="size"
                          value={s.quantity}
                          onSelect={e => e.target.select()}
                          onChange={e => onSizeQuantityChange(e, sizeIdx)}
                          innerRef={register({ required: true })}
                          invalid={errors.size && true}
                        />
                        {errors && errors.size && <FormFeedback>Size is required!</FormFeedback>}
                      </FormGroup>
                    </Fragment>
                  ))}

                  {/*  */}

                  <FormGroup tag={Col} xs="6">
                    <Input type="text" value="Total" className="text-center" disabled />
                  </FormGroup>
                  <FormGroup tag={Col} xs="6">
                    <Input type="text" value={sizeInfo.total} className="text-center" disabled />
                  </FormGroup>
                  <FormGroup tag={Col} xs="6">
                    <Label className="text-dark font-weight-bold" for="width">
                      Width
                    </Label>
                    <Input
                      id="width"
                      type="text"
                      name="width"
                      placeholder="Width"
                      innerRef={register({ required: true })}
                      invalid={errors.width && true}
                    />
                    {errors && errors.width && <FormFeedback>Width is required!</FormFeedback>}
                  </FormGroup>
                  <FormGroup tag={Col} xs="6">
                    <Label className="text-dark font-weight-bold" for="length">
                      Length
                    </Label>
                    <Input
                      id="length"
                      type="text"
                      name="length"
                      placeholder="Length"
                      innerRef={register({ required: true })}
                      invalid={errors.length && true}
                    />
                    {errors && errors.length && (
                      <FormFeedback>Length Cut is required!</FormFeedback>
                    )}
                  </FormGroup>
                </Row>
              </Col>
              <hr />
            </Row>

            <Row className="border rounded rounded-3 mt-1">
              <FormGroup tag={Col} xs={12} sm={12} md={12} lg={12} xl={12} className="mt-n1">
                <Badge color="primary">{`PO Details`}</Badge>
              </FormGroup>
              <FormGroup tag={Col} xs={12} sm={12} md={12} lg={12} xl={12}>
                <Table className={classes.poDetailsTable} size="sm" responsive>
                  <thead className={`thead-dark table-bordered ${classes.stickyTableHead}`}>
                    <tr className="text-center">
                      <th style={{ minWidth: '4px' }}>
                        <strong>#</strong>
                      </th>
                      <th>
                        <strong>PO No.</strong>
                      </th>
                      <th>
                        <strong>Destination</strong>
                      </th>
                      <th>
                        <strong>Inspection Date</strong>
                      </th>
                      <th>
                        <strong>Shipment Mode</strong>
                      </th>
                      <th>
                        <strong>Shipment Date</strong>
                      </th>

                      <th>
                        <strong>Order Qty</strong>
                      </th>
                      <th>
                        <strong>Order UOM</strong>
                      </th>

                      <th>
                        <strong>Excess Qty</strong>
                      </th>
                      <th>
                        <strong>Wastage Qty</strong>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {orderDetails.map((i, odidx) => (
                      <Fragment key={i.fieldId + i.fieldId}>
                        <tr key={i.fieldId}>
                          <td style={{ minWidth: '4px' }}>
                            <Button
                              for="collapseId"
                              tag={Label}
                              onClick={() => togglePoDetails(odidx)}
                              className="btn-sm"
                              color="flat-primary"
                            >
                              {i.isOpen ? (
                                <Minimize2 size={15} color="#57C69D" />
                              ) : (
                                <Maximize2 id="collapseId" size={15} color="#7367f0" />
                              )}
                            </Button>
                          </td>
                          <td>{i.poNo}</td>
                          <td>{i.destination}</td>
                          <td>{i.inspectionDate}</td>
                          <td>{i.shipmentMode}</td>
                          <td>{i.shipmentDate}</td>
                          <td>{i.orderQuantity}</td>
                          <td>{i.orderUOM}</td>
                          <td>{i.excessQuantity}</td>
                          <td>{i.wastageQuantity}</td>
                        </tr>
                        <tr>
                          <td
                            colSpan={10}
                            style={{ padding: '2px 10px !important', backgroundColor: '#fff' }}
                          >
                            <Collapse isOpen={i.isOpen}>
                              <Table className={classes.childTable}>
                                <thead className="thead-light table-bordered">
                                  <tr>
                                    <th>#</th>
                                    <th>Color</th>
                                    <th>Order Qty</th>
                                    <th>Extra</th>
                                    <th>With Extra</th>
                                    <th>Previous</th>
                                    <th>Lay Count</th>
                                    <th>Cut Qty</th>
                                    <th>RC</th>
                                    <th>Balance</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {i.poDetails.map((pod, podIdx) => (
                                    <tr key={pod.fieldId}>
                                      <td className="text-center">
                                        <CustomInput
                                          type="checkbox"
                                          className="custom-control-primary"
                                          id={`pod-${pod.fieldId}`}
                                          checked={pod.isChecked}
                                          inline
                                          onChange={e => toggleCheck(e, odidx, podIdx)}
                                        />
                                      </td>
                                      <td className="text-left">{pod.color}</td>
                                      <td>{pod.orderQuantity}</td>
                                      <td style={{ maxWidth: '20px' }}>
                                        {pod.isChecked ? (
                                          <Input
                                            id="extra"
                                            type="number"
                                            name="extra"
                                            bsSize="sm"
                                            value={pod.extra}
                                            onSelect={e => e.target.select()}
                                            onChange={e =>
                                              onExtraPercentageChange(e, odidx, podIdx)
                                            }
                                          />
                                        ) : (
                                          pod.extra
                                        )}
                                      </td>
                                      <td>{pod.withExtra}</td>
                                      <td>{pod.previousQty}</td>
                                      <td>{pod.layCount}</td>
                                      <td style={{ maxWidth: '20px' }}>
                                        {pod.isChecked ? (
                                          <Input
                                            id="totalQty"
                                            type="number"
                                            name="totalQty"
                                            value={pod.cutQuantity}
                                            bsSize="sm"
                                            onFocus={onFocusCutQuantity}
                                            onSelect={e => e.target.select()}
                                            onChange={e => onOutQuantityChange(e, odidx, podIdx)}
                                          />
                                        ) : (
                                          pod.cutQuantity
                                        )}
                                        {pod.hasError && (
                                          <span className="text-danger">limit exceeded</span>
                                        )}
                                      </td>
                                      <td>
                                        <MoreVertical
                                          className="cursor-pointer"
                                          onClick={hanldeSizeRatioModalToggle}
                                        />
                                      </td>
                                      <td>{pod.balance}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </Collapse>
                          </td>
                        </tr>
                      </Fragment>
                    ))}
                  </tbody>
                </Table>
              </FormGroup>
              <hr />
            </Row>
          </Form>
        </CardBody>
        {sizeRatioModal && (
          <SizeRatioDetails openModal={sizeRatioModal} setOpenModal={setSizeRatioModal} />
        )}
      </Card>
    </div>
  );
};

export default CutPlanAddForm;

/**
 * 23-Jan-2022 : add collapsible table in Cut plan create form
 * 26-Jan-2022 : add toggle checkbox, define cut qty, define size ratio with reset feature
 **/
