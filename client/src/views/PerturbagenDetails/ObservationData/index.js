import React, { useState, useEffect } from 'react';

import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Table from 'components/Table/Table';

import { CallApi } from 'api/api';
import Lottie from 'react-lottie';
import animationData from 'assets/lottie/loading2.json';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle';

const useStyles = makeStyles(styles);

const ObservationData = () => {
  const classes = useStyles();

  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const perturbagen = window.location.href.split('/')[4];

  useEffect(() => {
    const query =
      `Select substrate, cell_line, fold_change, p_value, cv from Observation ` +
      `where perturbagen="${perturbagen}" and fold_change <> -888 and p_value <> -888 order by cell_line, substrate`;

    CallApi(query).then((res) => {
      setTableData(
        res
          .map((e) => ({
            ...e,
            fold_change: e.fold_change.toFixed(2),
            p_value: e.p_value.toFixed(2),
            cv: e.cv.toFixed(2),
          }))
          .map(Object.values)
      );
    });
  }, [perturbagen]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
  };

  return (
    <div style={{ padding: '2em' }}>
      <Card>
        <CardHeader color='primary'>
          <h4 className={classes.cardTitleWhite}>Perturbagens</h4>
          <p className={classes.cardCategoryWhite}>Select a perturbagen</p>
        </CardHeader>
        <CardBody>
          {tableData.length === 0 ? (
            <Lottie options={defaultOptions} height={500} width={500} />
          ) : (
            <Table
              className='my-node'
              tableHeaderColor='primary'
              tableHead={['Substrate', 'Cell Line', 'Fold change', 'p Value', 'CV']}
              tableData={tableData}
              rowsPerPage={10}
              currentPage={currentPage}
              handleChangePage={handleChangePage}
            />
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default ObservationData;
