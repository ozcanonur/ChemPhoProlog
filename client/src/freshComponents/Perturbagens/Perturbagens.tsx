import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import GridItem from 'freshComponents/Misc/CustomGrid/GridItem';
import GridContainer from 'freshComponents/Misc/CustomGrid/GridContainer';
import CardGeneric from 'freshComponents/Misc/Card/CardGeneric';
import Table from 'freshComponents/Misc/CustomTable/Table';
import Slide from '@material-ui/core/Slide';
import axios from 'axios';

import { addSidebarRoute } from 'actions/main';

import NewFindingsCard from 'freshComponents/Misc/NewFindings/NewFindingsCard';

const PerturbagenList = (): JSX.Element => {
  const [data, setData] = useState<Perturbagen[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPerturbagen, setSelectedPerturbagen] = useState('');
  const [rightPanelOpen, setRightPanelOpen] = useState(false);

  // Fetch data on render
  useEffect(() => {
    let mounted = true;

    axios
      .get('/apiWeb/getPerturbagenList')
      .then((res) => {
        if (mounted) setData(res.data);
      })
      .catch((err) => console.error(err));

    return () => {
      mounted = false;
    };
  }, []);

  // Table data
  const tableData = useMemo(() => {
    return data.map(Object.values);
  }, [data]);

  // On page change
  const handlePageChange = (_event: Event, page: number) => {
    setCurrentPage(page);
  };

  // Select item
  const handleSelection = (perturbagen: string) => {
    setSelectedPerturbagen(perturbagen);
  };

  // Right panel animation
  useEffect(() => {
    setRightPanelOpen(false);

    if (selectedPerturbagen !== '') {
      setTimeout(() => {
        setRightPanelOpen(true);
      }, 250);
    }
  }, [selectedPerturbagen]);

  // Get specific information about this perturbagen to display in the right panel
  const selectedInfo = useMemo(() => {
    return data.find((item) => item.name === selectedPerturbagen);
  }, [data, selectedPerturbagen]);

  // Handler for adding to the sidebar
  const dispatch = useDispatch();
  const handlePerturbagenAdd = (perturbagen: string) => {
    dispatch(addSidebarRoute('perturbagen', perturbagen));
  };

  return (
    <GridContainer direction='row' style={{ padding: '2em' }}>
      <GridItem sm={12} lg={6}>
        <CardGeneric
          color='primary'
          cardTitle='Perturbagens'
          cardSubtitle='Select a perturbagen'
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
              handlePageChange={handlePageChange}
              firstRowOnClick
              selectedItem={selectedPerturbagen}
            />
          )}
        </CardGeneric>
      </GridItem>
      <GridItem sm={12} lg={6}>
        <Slide in={rightPanelOpen} direction='left' mountOnEnter unmountOnExit>
          <div>
            {selectedInfo !== undefined ? (
              <CardGeneric
                color='primary'
                cardTitle='Perturbagen Specification'
                cardSubtitle='Details'
              >
                <GridContainer direction='column'>
                  <GridItem>
                    <CardGeneric
                      color='primary'
                      cardTitle={selectedPerturbagen}
                    >
                      <div style={{ textAlign: 'center' }}>
                        <img
                          src={`https://www.chemspider.com/ImagesHandler.ashx?id=${selectedInfo.chemspider_id}&w=250&h=250`}
                          alt='Perturbagen'
                        />
                      </div>
                    </CardGeneric>
                  </GridItem>
                  <GridItem>
                    <NewFindingsCard
                      leftIconTitle='New Targets'
                      leftIconText='12'
                      rightIconTitle='New PDTs'
                      rightIconText='34'
                    />
                  </GridItem>
                </GridContainer>
              </CardGeneric>
            ) : null}
          </div>
        </Slide>
      </GridItem>
    </GridContainer>
  );
};

export default PerturbagenList;
