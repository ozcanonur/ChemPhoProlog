import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import addInspectPath from 'actions/Pathway/addInspectPath';

import Table from 'components/Table/Table';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';

import { makeStyles } from '@material-ui/core/styles';
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

  const data = useSelector((state) => state.pathwayData);
  const { paths, stoppingReasons } = data;
  const tableData = parsePathsToTableData(paths, stoppingReasons);

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
      <CardHeader color='rose'>
        <h4 className={classes.cardTitleWhite}>Paths found</h4>
        <p className={classes.cardCategoryWhite}> MCF-7 / Torin / AKT1(S473)</p>
      </CardHeader>
      <CardBody>
        <Table
          className='my-node'
          tableHeaderColor='warning'
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
