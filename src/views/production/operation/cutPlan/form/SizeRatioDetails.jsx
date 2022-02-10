/*
     Title: Size Ratio Modal
     Description:Size Ratio Modal
     Author: Iqbal Hossain
     Date: 24-January-2022
     Modified: 24-January-2022
*/

const sizeRatioData = [
  { id: 1, size: 'S', lay: 200, ratio: 1, quantity: 200 },
  { id: 2, size: 'M', lay: 200, ratio: 3, quantity: 400 },
  { id: 3, size: 'L', lay: 200, ratio: 3, quantity: 600 }
];

import React from 'react';
import { Card, CardBody, Table } from 'reactstrap';
import CustomModal from 'utility/custom/CustomModal';

const SizeRatioDetails = props => {
  const { openModal, setOpenModal } = props;

  //#region  Events

  const handleMainModalToggleClose = () => {
    setOpenModal(!openModal);
  };

  const handleModalSubmit = () => {
    setOpenModal(!openModal);
  };

  //#endregion
  return (
    <div>
      <CustomModal
        modalTypeClass="vertically-centered-modal"
        className="modal-dialog-centered modal-lg"
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleMainModelSubmit={handleModalSubmit}
        handleMainModalToggleClose={handleMainModalToggleClose}
        title="Size Ratio Info"
      >
        <Card outline>
          <CardBody className="custom-table">
            <Table size="sm" bordered hover className="tableThTd">
              <thead className="thead-dark">
                <tr className="text-center">
                  <th className="text-nowrap">Size</th>
                  <th className="text-nowrap">Lay</th>
                  <th className="text-nowrap">Ratio</th>
                  <th className="text-nowrap">Quantity</th>
                </tr>
              </thead>
              <tbody style={{ padding: '10px 0 !important' }}>
                {sizeRatioData.map(sr => (
                  <tr className="text-center" key={sr.id}>
                    <td>{sr.size}</td>
                    <td>{sr.lay}</td>
                    <td>{sr.ratio}</td>
                    <td>{sr.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </CustomModal>
    </div>
  );
};

export default SizeRatioDetails;

/** Change Log
 * 24-Jan-2022(Iqbal): Size Ratio Modal modal create
 */
