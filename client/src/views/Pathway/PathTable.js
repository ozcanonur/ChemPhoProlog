import React, { useState, useEffect } from 'react';

import Table from 'components/Table/Table';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';

import { useDispatch } from 'react-redux';
import addPathwaySelect from 'actions/Pathway/addPathwaySelect';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle';

const useStyles = makeStyles(styles);

const parsePathwaysToTableData = (pathways, stoppingReasons) =>
  pathways.map((path, key) => {
    const pathLength = path.length;
    const stopNode = path[pathLength - 1];
    const stopReason = stoppingReasons[stopNode];

    return [key, stopNode, stopReason, pathLength];
  });

const PathTable = ({ pathwayData }) => {
  const classes = useStyles();

  const { pathways, stoppingReasons } = pathwayData;

  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const parsedPathways = parsePathwaysToTableData(pathways, stoppingReasons);
    setTableData(parsedPathways);
  }, [pathways, stoppingReasons]);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const dispatch = useDispatch();
  const handleAddPathway = (row) => {
    dispatch(addPathwaySelect(row));
  };

  return (
    <Card>
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
          handleAddPathway={handleAddPathway}
        />
      </CardBody>
    </Card>
  );
};

export default PathTable;
