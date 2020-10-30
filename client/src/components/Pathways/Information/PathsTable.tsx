import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addInspectPath } from 'actions/pathways';

import Table from 'components/Misc/CustomTable/Table';
import CardGeneric from 'components/Misc/Card/CardGeneric';

const parsePathsToTableData = (
  paths: Pathway.Paths,
  stoppingReasons: Pathway.StoppingReasons
) => {
  const tableData = paths.map((path, key) => {
    const pathLength = path.length;
    const stopNode = path[pathLength - 1];
    const stopReason = stoppingReasons[stopNode];

    return [key, stopNode, stopReason, pathLength];
  });

  // @ts-ignore
  return tableData.sort((x, y) => y[3] - x[3]);
};

const PathsTable = (): JSX.Element => {
  const { cellLine, perturbagen, substrate } = useSelector(
    (state: RootState) => state.pathwayInputs
  );
  const data = useSelector((state: RootState) => state.pathwayData) || {
    paths: [],
    relations: {},
    phosphosites: [],
    regulatory: {},
    stoppingReasons: {},
    observation: {},
  };
  const { paths, stoppingReasons } = data;

  const tableData = useMemo(() => {
    return parsePathsToTableData(paths, stoppingReasons);
  }, [paths, stoppingReasons]);

  const [currentPage, setCurrentPage] = useState(0);
  const handlePageChange = (_event: Event, newPage: number) => {
    setCurrentPage(newPage);
  };

  const dispatch = useDispatch();
  const handleAddPath = (row: string[]) => {
    dispatch(addInspectPath(row));
  };

  return (
    <CardGeneric
      color='primary'
      cardTitle='Paths found'
      cardSubtitle={`${cellLine} / ${perturbagen} / ${substrate}`}
    >
      <Table
        tableHeaderColor='primary'
        tableHead={['Path ID', 'Stop Node', 'Stop reason', 'Length', 'Inspect']}
        // @ts-ignore
        tableData={tableData}
        rowsPerPage={5}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        rowEndArrow
        handleAddPath={handleAddPath}
      />
    </CardGeneric>
  );
};

export default PathsTable;
