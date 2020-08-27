import React, { useState, useEffect } from 'react';

import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Table from 'components/Table/Table';

import { CallApiForPDTs } from 'api/api';

import ObservationBarChart from 'views/KinaseDetails/Substrates/PDTs/ObservationBarChart';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle';

const useStyles = makeStyles(styles);

const PDTTable = ({ cell_line }) => {
  const classes = useStyles();

  const [currentPage, setCurrentPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const [PDTs, setPDTs] = useState([]);
  const kinase = window.location.href.split('/')[4];

  useEffect(() => {
    let mounted = true;

    CallApiForPDTs(kinase, cell_line).then((res) => {
      if (mounted) {
        setPDTs(res);
      }
    });

    return function cleanUp() {
      mounted = false;
    };
  }, [kinase, cell_line]);

  return (
    <Card>
      <CardHeader color='warning'>
        <h4 className={classes.cardTitleWhite}>Putative Downstream Targets</h4>
        <p className={classes.cardCategoryWhite}>Select a substrate</p>
      </CardHeader>
      <CardBody>
        {PDTs.length === 0 ? (
          <div>No entries found.</div>
        ) : (
          <Table
            className='my-node'
            tableHeaderColor='warning'
            tableHead={['Obs.Data', 'Substrate', 'Protein', 'Confidence', 'Shared with']}
            tableData={PDTs.map(Object.values)}
            rowsPerPage={10}
            rowEndArrow={false}
            currentPage={currentPage}
            handleChangePage={handleChangePage}
            cell_line={cell_line}
            ExtraContent={ObservationBarChart}
          />
        )}
      </CardBody>
    </Card>
  );
};

export default PDTTable;
