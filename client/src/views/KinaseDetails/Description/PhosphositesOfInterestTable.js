import React, { useState, useEffect } from 'react';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import Table from 'components/Table/Table';

import { CallApiForProteinSubstrates } from 'api/api';

import ObservationHeatMap from 'views/KinaseDetails/Description/ObservationHeatMap';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle';

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
        {tableData.length === 0 ? (
          <div>No entries found.</div>
        ) : (
          <Table
            className='my-node'
            tableHeaderColor='warning'
            tableHead={[
              'Obs. Data',
              'Location',
              'Residue',
              'Detected in',
              'Pst_effect',
              'Reported Substrate of',
              'Reported PDT of',
            ]}
            tableData={tableData}
            rowsPerPage={10}
            rowEndArrow={false}
            currentPage={currentPage}
            handleChangePage={handleChangePage}
            firstRowOnClick={false}
            ExtraContent={ObservationHeatMap}
          />
        )}
      </CardBody>
    </Card>
  );
};

export default PhosphositesOfInterestTable;
