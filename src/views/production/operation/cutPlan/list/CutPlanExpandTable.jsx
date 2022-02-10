import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDown, XSquare } from 'react-feather';
import { useDispatch } from 'react-redux';
import { Button, Card } from 'reactstrap';
import CustomPreLoader from 'utility/custom/CustomPreLoader';
import { deleteCutPlanByRange, fetchCutPlansByQuery } from '../store/actions';
import { cutPlanDetailsTablecolumn } from './cutPlanTableColumn';

const CutPlanExpandTable = props => {
  const {
    data: { details }
  } = props;
  const dispatch = useDispatch();

  //#region States
  const [clearSelectedRow, setClearSelectedRow] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState([]);

  //#endregion

  //#region Effects
  useEffect(() => {
    dispatch(fetchCutPlansByQuery());
  }, [dispatch]);
  //#endregion

  //#region Events

  // ** Start For Multiple Rows for Get IDs
  const handleRowSelected = () => {
    setClearSelectedRow(false);
  };

  const handleSort = (column, direction) => {
    const { selector } = column;
    dispatch(fetchCutPlansByQuery({ sortedBy: direction, sortedColumn: selector }));
  };

  // **Clear Delete Ids
  const handleClearSelected = () => {
    setClearSelectedRow(true);
  };

  // ** Delete Rang
  const handleDeleteByRange = () => {
    dispatch(deleteCutPlanByRange(selectedRowId));
    setSelectedRowId([]);
    handleClearSelected();
  };
  //#endregion

  return (
    <div>
      <Card>
        <DataTable
          style={{ padding: '0px 60px' }}
          onSelectedRowsChange={handleRowSelected}
          onSort={handleSort}
          progressPending={!details.length}
          progressComponent={<CustomPreLoader />}
          contextActions={
            <Button.Ripple onClick={handleDeleteByRange} className="btn-icon " color="flat-danger">
              <XSquare size={24} />
            </Button.Ripple>
          }
          dense
          subHeader={false}
          highlightOnHover
          selectableRows
          clearSelectedRows={clearSelectedRow}
          responsive={true}
          paginationServer
          persistTableHead
          columns={cutPlanDetailsTablecolumn}
          sortIcon={<ChevronDown />}
          data={details}
        />
      </Card>
    </div>
  );
};

export default CutPlanExpandTable;
