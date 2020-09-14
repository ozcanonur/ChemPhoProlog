/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import setPathExplanation from 'redux/actions/Pathway/setPathExplanation';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import Table from 'components/Table/Table';

import makeStyles from '@material-ui/core/styles/makeStyles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle';

const useStyles = makeStyles(styles);

const PathDetails = () => {
  const classes = useStyles();

  const { perturbagen } = useSelector((state) => state.pathwayInputs);
  const selectedPath = useSelector((state) => state.selectedPath);
  const pathExplanation = useSelector((state) => state.pathExplanation);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPathExplanation(selectedPath));
  }, [dispatch, selectedPath]);

  const [currentPage, setCurrentPage] = useState(0);
  const handleChangePage = (_event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Card style={{ height: 750, opacity: selectedPath.length === 0 ? 0.5 : 1 }}>
      <CardHeader color='primary'>
        <h4 className={classes.cardTitleWhite}>Explanation</h4>
        <p className={classes.cardCategoryWhite}>{perturbagen}</p>
      </CardHeader>
      <CardBody>
        <Table
          className='my-node'
          tableHeaderColor='primary'
          tableHead={['Start', 'Phosphosite', 'End']}
          tableData={pathExplanation.length > 1 ? pathExplanation : []}
          rowsPerPage={10}
          currentPage={currentPage}
          handleChangePage={handleChangePage}
        />
      </CardBody>
    </Card>
  );
};

export default PathDetails;
