/*
     Title: Bundle Assign EP Reject Info
     Description: Bundle Assign EP Reject Info
     Author: Iqbal Hossain
     Date: 24-January-2022
     Modified: 24-January-2022
*/

import React from 'react';
import { Card, CardBody, Label, Table } from 'reactstrap';
import CustomModal from 'utility/custom/CustomModal';

const BundleAssignEPRejectInfo = props => {
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
        title="Bundle Assign EP Reject Info"
      >
        <Card outline>
          <CardBody className="custom-table">
            <Table size="sm" bordered hover>
              <thead className="thead-dark">
                <tr className="text-center">
                  <th className="text-nowrap">Serial No</th>
                  <th className="text-nowrap">Reject Type</th>
                  <th className="text-nowrap">Remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td>
                    <Label className="text-dark font-weight-bold">10</Label>
                  </td>
                  <td>
                    <Label className="text-dark font-weight-bold">Reject</Label>
                  </td>
                  <td>
                    <Label className="text-dark font-weight-bold">Dropped Stitch</Label>
                  </td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </CustomModal>
    </div>
  );
};

export default BundleAssignEPRejectInfo;

/** Change Log
 * 24-Jan-2022(Iqbal): Bundle Assign EP Reject info modal create
 */
