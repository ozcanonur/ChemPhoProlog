import React, { useState, useEffect } from 'react';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import Table from 'components/Table/Table';

import { CallApiForProteinSubstrates } from 'api/api';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';

const useStyles = makeStyles(styles);

const PhosphositesOfInterestTable = ({ protein }) => {
  const classes = useStyles();

  const [currentPage, setCurrentPage] = useState(0);
  const [tableData, setTableData] = useState([]);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    let mounted = true;

    CallApiForProteinSubstrates(protein).then((res) => {
      if (mounted) {
        setTableData(res.map(Object.values));
      }
    });

    return function cleanUp() {
      mounted = false;
    };
  }, [protein]);

  return (
    <Card>
      <CardHeader color='warning'>
        <h4 className={classes.cardTitleWhite}>Phosphosites of interest</h4>
        <p className={classes.cardCategoryWhite}>Select a phosphosite</p>
      </CardHeader>
      <CardBody>
        <Table
          className='my-node'
          tableHeaderColor='warning'
          tableHead={[
            '',
            'Location',
            'Residue',
            'Detected in',
            'Reported Substrate of',
            'Reported PDT of',
          ]}
          tableData={tableData}
          rowsPerPage={10}
          rowEndArrow={false}
          currentPage={currentPage}
          handleChangePage={handleChangePage}
          expandable={true}
          expandFor={'phosphositesOfInterest'}
        />
      </CardBody>
    </Card>
  );
};

export default PhosphositesOfInterestTable;
