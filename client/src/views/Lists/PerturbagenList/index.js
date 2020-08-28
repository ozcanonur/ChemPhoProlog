import React, { useState, useEffect } from 'react';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import Typography from '@material-ui/core/Typography';
import CardHeader from 'components/Card/CardHeader';
import Table from 'components/Table/Table';

import PerturbagenListRightPanel from 'views/Lists/PerturbagenList/PerturbagenListRightPanel';

import { Slide } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import fetchPerturbagenData from 'actions/PerturbagenList/fetchPerturbagenData';
import changeSelectedPerturbagen from 'actions/PerturbagenList/changeSelectedPerturbagen';
import changeCurrentPagePerturbagen from 'actions/PerturbagenList/changeCurrentPagePerturbagen';
import addSidebarRoutePerturbagen from 'actions/Sidebar/addSidebarRoutePerturbagen';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle';

const useStyles = makeStyles(styles);

const PerturbagenList = () => {
  const classes = useStyles();
  // Table data
  const data = useSelector((state) => state.perturbagenData);
  const tableData = data.map(Object.values);

  const dispatch = useDispatch();
  useEffect(() => {
    if (data.length === 0) {
      const query = 'select * from Perturbagen group by name order by name';
      dispatch(fetchPerturbagenData(query));
    }
  }, [data, dispatch]);

  // Currently selected item
  const selectedItem = useSelector((state) => state.selectedPerturbagen);
  const handleSelection = (selection) => {
    dispatch(changeSelectedPerturbagen(selection));
  };
  const selectedInfo = data.filter((item) => item.name === selectedItem)[0];

  // Current page
  const currentPage = useSelector((state) => state.currentPagePerturbagen);
  const handlePageChange = (event, page) => {
    dispatch(changeCurrentPagePerturbagen(page));
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

  const handlePerturbagenAdd = (selection) => {
    dispatch(addSidebarRoutePerturbagen(selection));
  };

  return (
    <div>
      <GridContainer direction='column' justify='space-between' style={{ padding: '2em' }}>
        <GridItem md>
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
        <GridItem md>
          <GridContainer direction='row'>
            <GridItem sm={12} lg={6}>
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
                      tableHead={['Name', 'Chemspider ID', 'Action', 'Synonyms', '']}
                      tableData={tableData}
                      rowsPerPage={10}
                      rowEndArrow
                      handleSelection={handleSelection}
                      handleAdd={handlePerturbagenAdd}
                      currentPage={currentPage}
                      handleChangePage={handlePageChange}
                      firstRowOnClick
                      selectedItem={selectedItem}
                    />
                  )}
                </CardBody>
              </Card>
            </GridItem>
            <GridItem sm={12} lg={6}>
              <Slide in={rightPanelOpen} direction='left' mountOnEnter unmountOnExit>
                <div>
                  {selectedInfo !== undefined ? <PerturbagenListRightPanel selectedInfo={selectedInfo} /> : null}
                </div>
              </Slide>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default PerturbagenList;
