import React, { useState, useEffect, useMemo } from 'react';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import CardGeneric from 'components/Card/CardGeneric';
import Typography from '@material-ui/core/Typography';
import Table from 'components/Table/Table';
import Slide from '@material-ui/core/Slide';

import { useSelector, useDispatch } from 'react-redux';
import fetchPerturbagenData from 'actions/PerturbagenList/fetchPerturbagenData';
import changeSelectedPerturbagen from 'actions/PerturbagenList/changeSelectedPerturbagen';
import changeCurrentPagePerturbagen from 'actions/PerturbagenList/changeCurrentPagePerturbagen';
import addSidebarRoutePerturbagen from 'actions/Sidebar/addSidebarRoutePerturbagen';

import PerturbagenListRightPanel from 'views/Lists/PerturbagenList/PerturbagenListRightPanel';

const PerturbagenList = () => {
  const data = useSelector((state) => state.perturbagenData);
  const tableData = useMemo(() => {
    return data.map(Object.values);
  }, [data]);

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
          <CardGeneric>
            <Typography variant='body1'>
              ChemPhoPro provides a compendium of results and related information obtained from chemical
              phosphoproteomics experiments. And some other stuff. ChemPhoPro provides a compendium of results and
              related information obtained from chemical phosphoproteomics experiments. And some other stuff. ChemPhoPro
              provides a compendium of results and related information obtained from chemical phosphoproteomics
              experiments. And some other stuff.
            </Typography>
          </CardGeneric>
        </GridItem>
        <GridItem md>
          <GridContainer direction='row'>
            <GridItem sm={12} lg={6}>
              <CardGeneric
                color='primary'
                cardTitle='Perturbagens'
                cardSubtitle='Select a perturbagen'
                style={{ height: 900 }}
              >
                {tableData.length === 0 ? (
                  <div>Loading...</div>
                ) : (
                  <Table
                    className='my-node'
                    tableHeaderColor='primary'
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
              </CardGeneric>
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
