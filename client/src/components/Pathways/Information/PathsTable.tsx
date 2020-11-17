import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addInspectPath } from 'actions/pathways';

import Table from 'components/Misc/CustomTable/Table';
import CardGeneric from 'components/Misc/Card/CardGeneric';
import Button from 'components/Misc/CustomButton/Button';
import { playToast, PathAddedToInspectListToast } from 'components/Misc/Toast/toast';
import { HelperPopupPathsTable } from '../HelperPopups';

const parsePathsToTableData = (paths: Pathway.Paths, stoppingReasons: Pathway.StoppingReasons) => {
  const tableData = paths.map((path, key) => {
    const pathLength = path.length;
    const stopNode = path[pathLength - 1];
    const stopReason = stoppingReasons[stopNode];

    return [key.toString(), stopNode, stopReason, pathLength.toString()];
  });

  // @ts-ignore
  return tableData.sort((x, y) => y[3] - x[3]);
};

const PathsTable = () => {
  const { cellLine, perturbagen, substrate } = useSelector((state: RootState) => state.pathwayInputs);
  const data = useSelector((state: RootState) => state.pathwayData);

  const dispatch = useDispatch();

  const { paths, stoppingReasons } = data;

  const tableData = useMemo(() => {
    return parsePathsToTableData(paths, stoppingReasons);
  }, [paths, stoppingReasons]);

  // Button on the right of the row
  // row prop will come from the table component's row
  const RowContentRight = ({ row }: { row: string[] }) => {
    const addPathToInspection = () => {
      dispatch(addInspectPath(row));
      playToast(`PathAddedToInspectList_${row[1]}`, <PathAddedToInspectListToast item={row[1]} />);
    };

    return (
      <Button onClick={addPathToInspection} size='sm' style={{ backgroundColor: 'rgba(17, 59, 94, 0.7)' }}>
        <div>Add to inspection</div>
      </Button>
    );
  };

  return (
    <CardGeneric color='primary' cardTitle='Paths found' cardSubtitle={`${cellLine} / ${perturbagen} / ${substrate}`}>
      {tableData.length > 0 ? <HelperPopupPathsTable /> : undefined}
      <Table
        id={`${cellLine}${perturbagen}${substrate}_PathsTable`}
        tableHead={['Path ID', 'Stop Node', 'Stop reason', 'Length', '']}
        tableData={tableData}
        RowContentRight={RowContentRight}
        searchIndex={1}
      />
    </CardGeneric>
  );
};

export default PathsTable;
