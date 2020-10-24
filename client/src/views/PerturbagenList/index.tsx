import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import CardGeneric from 'components/Card/CardGeneric';
import Table from 'components/Table/Table';
import Slide from '@material-ui/core/Slide';

import {
  fetchPerturbagenData,
  changeSelectedPerturbagen,
  changeCurrentPagePerturbagen,
  addSidebarPerturbagen,
} from 'actions/main';

import PerturbagenListRightPanel from 'views/PerturbagenList/PerturbagenListRightPanel';

const PerturbagenList = () => {
  const data = useSelector((state) => state.perturbagenData);
  const tableData = useMemo(() => {
    return data.map(Object.values);
  }, [data]);

  const dispatch = useDispatch();
  useEffect(() => {
    if (data.length === 0) dispatch(fetchPerturbagenData());
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
    dispatch(addSidebarPerturbagen(selection));
  };

  return (
    <GridContainer direction='row' style={{ padding: '2em' }}>
      <GridItem sm={12} lg={6}>
        <CardGeneric
          color='primary'
          cardTitle='Perturbagens'
          cardSubtitle='Select a perturbagen'
          style={{ height: 918 }}
        >
          {data === [] ? (
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
            {selectedInfo !== undefined ? (
              <PerturbagenListRightPanel selectedInfo={selectedInfo} />
            ) : null}
          </div>
        </Slide>
      </GridItem>
    </GridContainer>
  );
};

export default PerturbagenList;
