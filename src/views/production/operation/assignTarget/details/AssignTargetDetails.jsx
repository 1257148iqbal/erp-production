/*
     Title: Assign Target Details Modal
     Description:Assign Target Details Modal
     Author: Iqbal Hossain
     Date: 29-January-2022
     Modified: 29-January-2022
*/

import React from 'react';
import { Card, CardBody, Table } from 'reactstrap';
import CustomModal from 'utility/custom/CustomModal';

const AssingTargetDetails = props => {
  const { openModal, setOpenModal, data } = props;

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
        title="Assign Target Details Info"
      >
        <Card outline>
          <CardBody className="custom-table">
            <Table size="sm" bordered hover className="tableThTd">
              <thead className="thead-dark">
                <tr className="text-center">
                  <th className="text-nowrap">Line No</th>
                  <th className="text-nowrap">No of Machine</th>
                  <th className="text-nowrap">Target</th>
                  <th className="text-nowrap">Status</th>
                </tr>
              </thead>
              <tbody style={{ padding: '10px 0 !important' }}>
                {data.map(atd => (
                  <tr className="text-center" key={atd.id}>
                    <td className="text-left">{atd.lineNumber}</td>
                    <td>{atd.noOfMachine}</td>
                    <td>{atd.target}</td>
                    <td>{atd.status}</td>
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

export default AssingTargetDetails;

/** Change Log
 * 29-Jan-2022(Iqbal): Assign Target Details Modal modal create
 */
