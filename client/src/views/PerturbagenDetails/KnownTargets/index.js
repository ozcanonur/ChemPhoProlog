import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Table from 'components/Table/Table';

import { CallApi } from 'api/api';
import addSidebarRouteKinase from 'actions/Sidebar/addSidebarRouteKinase';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle';

const useStyles = makeStyles(styles);

const KnownTargets = () => {
  const classes = useStyles();

  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const dispatch = useDispatch();
  const handleKinaseAdd = (selection) => {
    dispatch(addSidebarRouteKinase(selection));
  };

  const perturbagen = window.location.href.split('/')[4];

  useEffect(() => {
    const query = `Select kinase, source, score from PK_relationship where perturbagen="${perturbagen}" order by kinase`;
    CallApi(query).then((res) => {
      setTableData(res.map((e) => ({ ...e, score: e.score.toFixed(2) })).map(Object.values));
    });
  }, [perturbagen]);

  return (
    <div style={{ padding: '2em' }}>
      <Card>
        <CardHeader color='warning'>
          <h4 className={classes.cardTitleWhite}>Perturbagens</h4>
          <p className={classes.cardCategoryWhite}>Select a perturbagen</p>
        </CardHeader>
        <CardBody>
          {tableData === [] ? (
            <div>Loading...</div>
          ) : (
            <Table
              className='my-node'
              tableHeaderColor='warning'
              tableHead={['Kinase', 'Source', 'Score']}
              tableData={tableData}
              rowsPerPage={10}
              collapsible={false}
              currentPage={currentPage}
              firstRowOnClick
              handleChangePage={handleChangePage}
              handleAdd={handleKinaseAdd}
            />
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default KnownTargets;
