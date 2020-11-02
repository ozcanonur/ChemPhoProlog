/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';

import { fetchFromApi } from 'api/api';
import GridItem from 'components/Misc/CustomGrid/GridItem';
import GridContainer from 'components/Misc/CustomGrid/GridContainer';
import CardGeneric from 'components/Misc/Card/CardGeneric';
import Table from 'components/Misc/CustomTable/Table';
import NewFindingsCard from 'components/Misc/NewFindings/NewFindingsCard';
import { addSidebarRoute } from 'actions/main';
import { useLocalStorage } from 'utils/customHooks';

const PerturbagenList = () => {
  const [data, setData] = useState<Perturbagen[]>([]);
  const [selectedPerturbagen, setSelectedPerturbagen] = useLocalStorage(
    'selectedPerturbagen',
    ''
  );
  const [rightPanelOpen, setRightPanelOpen] = useLocalStorage(
    'perturbagenRightPanelOpen',
    false
  );

  const dispatch = useDispatch();
  const history = useHistory();

  // Fetch data on render
  useEffect(() => {
    let mounted = true;

    fetchFromApi('/apiWeb/getPerturbagenList').then((res) => {
      if (mounted) setData(res);
    });

    return () => {
      mounted = false;
    };
  }, []);

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

  // Button on the right of the row
  // row prop will come from the table component's row
  const RowContentRight = ({ row }: { row: string[] }) => {
    const perturbagenName = row[0];

    const addToSidebar = () => {
      dispatch(addSidebarRoute('perturbagen', perturbagenName));
    };

    const selectRow = () => {
      setSelectedPerturbagen(perturbagenName);
    };

    return (
      <>
        <IconButton aria-label='expand row' size='small' onClick={addToSidebar}>
          <AddCircleOutline />
        </IconButton>
        <IconButton aria-label='expand row' size='small' onClick={selectRow}>
          <KeyboardArrowRight />
        </IconButton>
      </>
    );
  };

  const clickableCells: {
    [key: string]: (perturbagenName: string) => void;
  } = {
    '0': (perturbagenName: string) => {
      dispatch(addSidebarRoute('perturbagen', perturbagenName));
      history.push(`/${perturbagenName}/description`);
    },
    '1': (chemspiderId: string) => {
      window.open(`https://chemspider.com/${chemspiderId}`, '_blank');
    },
  };

  const tableData = useMemo(() => {
    return data.map(Object.values);
  }, [data]);

  const chemspiderId = selectedInfo
    ? `https://www.chemspider.com/ImagesHandler.ashx?id=${selectedInfo.chemspider_id}&w=250&h=250`
    : '';

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
              id='Perturbagens'
              tableHead={['Name', 'Chemspider ID', 'Action', 'Synonyms']}
              tableData={tableData}
              RowContentRight={RowContentRight}
              clickableCells={clickableCells}
              selectedItem={selectedPerturbagen}
              searchIndex={0}
            />
          )}
        </CardGeneric>
      </GridItem>
      <GridItem sm={12} lg={6}>
        <CardGeneric
          color='primary'
          cardTitle='Perturbagen Specification'
          cardSubtitle='Details'
        >
          <Slide
            in={rightPanelOpen}
            direction='left'
            mountOnEnter
            unmountOnExit
          >
            <div>
              <GridContainer direction='column'>
                <GridItem>
                  <CardGeneric color='primary' cardTitle={selectedPerturbagen}>
                    <div style={{ textAlign: 'center' }}>
                      <img src={chemspiderId} alt='Perturbagen' />
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
            </div>
          </Slide>
        </CardGeneric>
      </GridItem>
    </GridContainer>
  );
};

export default PerturbagenList;
