import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import addInspectPath from 'actions/Pathway/addInspectPath';

import Table from 'components/Table/Table';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';

import makeStyles from '@material-ui/core/styles/makeStyles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle';

const useStyles = makeStyles(styles);

const parsePathsToTableData = (paths, stoppingReasons) =>
  paths.map((path, key) => {
    const pathLength = path.length;
    const stopNode = path[pathLength - 1];
    const stopReason = stoppingReasons[stopNode];

    return [key, stopNode, stopReason, pathLength];
  });

const PathsTable = () => {
  const classes = useStyles();

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
    <Card style={{ height: 750 }}>
      <CardHeader color='primary'>
        <h4 className={classes.cardTitleWhite}>Paths found</h4>
        <p className={classes.cardCategoryWhite}>{`${cellLine} / ${perturbagen} / ${substrate}`}</p>
      </CardHeader>
      <CardBody>
        <Table
          className='my-node'
          tableHeaderColor='primary'
          tableHead={['ID', 'Stop Node', 'Stop reason', 'Length', 'Inspect']}
          tableData={tableData}
          rowsPerPage={5}
          currentPage={currentPage}
          handleChangePage={handleChangePage}
          rowEndArrow
          handleAddPath={handleAddPath}
        />
      </CardBody>
    </Card>
  );
};

export default PathsTable;
