import React, { useEffect, useState } from 'react';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import Typography from '@material-ui/core/Typography';
import CardHeader from 'components/Card/CardHeader';
import Table from 'components/Table/Table';

import KinaseListRightPanel from 'views/Lists/KinaseList/KinaseListRightPanel';

import { Slide } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import { pick } from 'lodash';

import fetchKinaseData from 'actions/KinaseList/fetchKinaseData';
import changeSelectedKinase from 'actions/KinaseList/changeSelectedKinase';
import changeCurrentPageKinase from 'actions/KinaseList/changeCurrentPageKinase';
import addSidebarRouteKinase from 'actions/Sidebar/addSidebarRouteKinase';

import KinaseListPhosphosites from 'views/Lists/KinaseList/KinaseListPhosphosites';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle';

const useStyles = makeStyles(styles);

// Kinase List on the Home page
const KinaseList = () => {
  const classes = useStyles();

  // Kinase table data
  const data = useSelector((state) => state.kinaseData);
  const tableData = data.map((e) => pick(e, ['kinase_name', 'expressed_in', 'uniprot_id'])).map(Object.values);

  const dispatch = useDispatch();
  useEffect(() => {
    if (data.length === 0) {
      const query = 'select * from Protein where kinase_name <> "" order by kinase_name';
      dispatch(fetchKinaseData(query));
    }
  }, [data, dispatch]);

  // Currently selected item
  const selectedItem = useSelector((state) => state.selectedKinase);
  const handleSelection = (selection) => {
    dispatch(changeSelectedKinase(selection));
  };
  const selectedInfo = data.filter((item) => item.kinase_name === selectedItem)[0];

  // Current page
  const currentPage = useSelector((state) => state.currentPageKinase);
  const handlePageChange = (event, page) => {
    dispatch(changeCurrentPageKinase(page));
  };

  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  useEffect(() => {
    setRightPanelOpen(false);

    if (selectedItem !== '') {
      setTimeout(() => {
        setRightPanelOpen(true);
      }, 300);
    }
  }, [selectedItem]);

  const handleKinaseAdd = (selection) => {
    dispatch(addSidebarRouteKinase(selection));
  };

  return (
    <div>
      <GridContainer direction='column' justify='space-between' style={{ padding: '2em' }}>
        <GridItem>
          <Card>
            <CardBody>
              <Typography variant='body1'>
                ChemPhoPro provides a compendium of results and related information obtained from chemical
                phosphoproteomics experiments. And some other stuff. ChemPhoPro provides a compendium of results and
                related information obtained from chemical phosphoproteomics experiments. And some other stuff.
                ChemPhoPro provides a compendium of results and related information obtained from chemical
                phosphoproteomics experiments. And some other stuff.
              </Typography>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem>
          <GridContainer direction='row' alignItems='stretch'>
            <GridItem xs={12} lg={6}>
              <Card>
                <CardHeader color='warning'>
                  <h4 className={classes.cardTitleWhite}>Kinases</h4>
                  <p className={classes.cardCategoryWhite}>Select a kinase</p>
                </CardHeader>
                <CardBody>
                  {tableData === [] ? (
                    <div>Loading...</div>
                  ) : (
                    <Table
                      className='my-node'
                      tableHeaderColor='warning'
                      tableHead={['Sites', 'Name', 'Expressed', 'Uniprot ID', '']}
                      tableData={tableData}
                      rowsPerPage={10}
                      rowEndArrow
                      handleSelection={handleSelection}
                      selectedInfo={selectedInfo}
                      handleAdd={handleKinaseAdd}
                      currentPage={currentPage}
                      handleChangePage={handlePageChange}
                      firstRowOnClick
                      ExtraContent={KinaseListPhosphosites}
                      selectedItem={selectedItem}
                    />
                  )}
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} lg={6}>
              <Slide in={rightPanelOpen} direction='left' mountOnEnter unmountOnExit>
                <div>{selectedInfo !== undefined ? <KinaseListRightPanel selectedInfo={selectedInfo} /> : null}</div>
              </Slide>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default KinaseList;
