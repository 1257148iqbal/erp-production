import '@custom-styles/merchandising/others/custom-table.scss';
import React from 'react';
import DataTable from 'react-data-table-component';
import { Card, Col, Input } from 'reactstrap';

const ExternalProcessAddForm = () => {
  const data = [
    {
      id: 1,
      bundleNumber: '45-M-01-M',
      date: '23/11/2021',
      sendQty: 24
    },
    {
      id: 2,
      bundleNumber: '45-M-01-F',
      date: '23/11/2021',
      sendQty: ''
    }
  ];

  //#region State
  const [externalProcess, setExternalProcess] = React.useState(data);

  //#endregion

  //#region Events

  //Function for Send Qty
  const onSendQtyChange = (e, idx) => {
    const _externalProcess = [...externalProcess];
    const clickedItem = _externalProcess[idx];
    clickedItem.sendQty = e.target.value;
    setExternalProcess(_externalProcess);
  };
  //#endregion

  return (
    <>
      <Card>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <div className="border rounded rounded-3 p-1">
            <DataTable
              data={externalProcess}
              columns={[
                {
                  name: 'Bundle Number',
                  minWidth: '170px',
                  selector: 'bundleNumber',
                  cell: row => row.bundleNumber
                },
                {
                  name: 'Date',
                  minWidth: '150px',
                  selector: 'date',
                  cell: row => row.date
                },
                {
                  name: 'Send Qty',
                  minWidth: '150px',
                  selector: 'sendQty',
                  cell: (row, epIdx) => (
                    <Input
                      name="sendQty"
                      id={row.id}
                      value={row.sendQty}
                      onChange={e => onSendQtyChange(e, epIdx)}
                    />
                  )
                }
              ]}
            />
          </div>
        </Col>
      </Card>
    </>
  );
};

export default ExternalProcessAddForm;
