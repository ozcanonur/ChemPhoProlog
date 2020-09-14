import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import addInspectPath from 'actions/Pathway/addInspectPath';

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Table from 'components/Table/Table';
import CardGeneric from 'components/Card/CardGeneric';
import WaffleChart from 'views/Pathway/Information/WaffleChart';

const parsePathsToTableData = (paths, stoppingReasons) => {
  const tableData = paths.map((path, key) => {
    const pathLength = path.length;
    const stopNode = path[pathLength - 1];
    const stopReason = stoppingReasons[stopNode];

    return [key, stopNode, stopReason, pathLength];
  });

  return tableData.sort((x, y) => y[3] - x[3]);
};

const PathsTable = () => {
  const { cellLine, perturbagen, substrate } = useSelector((state) => state.pathwayInputs);
  const data = useSelector((state) => state.pathwayData) || {
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
  const handleChangePage = (_event, newPage) => {
    setCurrentPage(newPage);
  };

  const dispatch = useDispatch();
  const handleAddPath = (row) => {
    dispatch(addInspectPath(row));
  };

  return (
    <GridContainer direction='column' justify='space-between'>
      <GridItem>
        <CardGeneric
          color='primary'
          cardTitle='Paths found'
          cardSubtitle={`${cellLine} / ${perturbagen} / ${substrate}`}
        >
          <Table
            className='my-node'
            tableHeaderColor='primary'
            tableHead={['Path ID', 'Stop Node', 'Stop reason', 'Length', 'Inspect']}
            tableData={tableData}
            rowsPerPage={5}
            currentPage={currentPage}
            handleChangePage={handleChangePage}
            rowEndArrow
            handleAddPath={handleAddPath}
          />
        </CardGeneric>
      </GridItem>
      <GridItem>
        <CardGeneric
          color='primary'
          cardTitle='Stopping Reasons'
          cardSubtitle={`${cellLine} / ${perturbagen} / ${substrate}`}
          style={{ height: '16rem' }}
        >
          <WaffleChart paths={paths} stoppingReasons={stoppingReasons} />
        </CardGeneric>
      </GridItem>
    </GridContainer>
  );
};

export default PathsTable;
