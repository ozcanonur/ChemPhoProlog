import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import Typography from '@material-ui/core/Typography';
import CardHeader from 'components/Card/CardHeader';
import Table from 'components/Table/Table';
import Slide from '@material-ui/core/Slide';
import pick from 'lodash/pick';

import fetchKinaseData from 'actions/KinaseList/fetchKinaseData';
import changeSelectedKinase from 'actions/KinaseList/changeSelectedKinase';
import changeCurrentPageKinase from 'actions/KinaseList/changeCurrentPageKinase';
import addSidebarRouteKinase from 'actions/Sidebar/addSidebarRouteKinase';

import KinaseListRightPanel from 'views/Lists/KinaseList/KinaseListRightPanel';
import KinaseListPhosphosites from 'views/Lists/KinaseList/KinaseListPhosphosites';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle';

const useStyles = makeStyles(styles);

// Kinase List on the Home page
const KinaseList = () => {
  const classes = useStyles();

  const data = useSelector((state) => state.kinaseData);
  const tableData = useMemo(() => {
    return data.map((e) => pick(e, ['kinase_name', 'expressed_in', 'uniprot_id'])).map(Object.values);
  }, [data]);

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

  console.log(data);
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
              <Card style={{ height: 900 }}>
                <CardHeader color='primary'>
                  <h4 className={classes.cardTitleWhite}>Kinases</h4>
                  <p className={classes.cardCategoryWhite}>Select a kinase</p>
                </CardHeader>
                <CardBody>
                  {data === [] ? (
                    <div>Loading...</div>
                  ) : (
                    <Table
                      className='my-node'
                      tableHeaderColor='primary'
                      tableHead={['Sites', 'Name', 'Expressed', 'Uniprot ID', '']}
                      tableData={tableData}
                      rowsPerPage={10}
                      currentPage={currentPage}
                      handleChangePage={handlePageChange}
                      rowEndArrow
                      handleSelection={handleSelection}
                      handleAdd={handleKinaseAdd}
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
