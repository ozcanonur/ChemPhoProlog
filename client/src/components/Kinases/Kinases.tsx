/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { pick } from 'lodash';
import axios from 'axios';

import GridItem from 'components/Misc/CustomGrid/GridItem';
import GridContainer from 'components/Misc/CustomGrid/GridContainer';
import CardGeneric from 'components/Misc/Card/CardGeneric';
import Table from 'components/Misc/CustomTable/Table';
import { useLocalStorage } from 'utils/customHooks';
import NewFindingsCard from 'components/Misc/NewFindings/NewFindingsCard';
import { addSidebarRoute } from 'actions/main';
import KinaseListPhosphosites from './KinaseListPhosphosites';

// Kinase List on the Home page
const KinaseList = (): JSX.Element => {
  const [data, setData] = useState<Kinase[]>([]);
  const [selectedKinase, setSelectedKinase] = useLocalStorage(
    'selectedKinase',
    ''
  );
  const [rightPanelOpen, setRightPanelOpen] = useLocalStorage(
    'kinaseRightPanelOpen',
    false
  );

  const history = useHistory();
  const dispatch = useDispatch();

  // Fetch data on render
  useEffect(() => {
    let mounted = true;

    axios
      .get('/apiWeb/getKinaseList')
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
    const relevantFieldsPicked = data.map((e) =>
      pick(e, ['kinase_name', 'expressed_in', 'uniprot_id'])
    );
    return relevantFieldsPicked.map(Object.values);
  }, [data]);

  // Right panel animation
  useEffect(() => {
    setRightPanelOpen(false);

    if (selectedKinase !== '') {
      setTimeout(() => {
        setRightPanelOpen(true);
      }, 250);
    }
  }, [selectedKinase]);

  // Get specific information about this kinase to display in the right panel
  const selectedInfo = useMemo(() => {
    return data.find((item) => item.kinase_name === selectedKinase);
  }, [data, selectedKinase]);

  // Button on the right of the row
  // row prop will come from the table component's row
  const RowContentRight = ({ row }: { row: string[] }) => {
    const kinaseName = row[0];

    const addToSidebar = () => {
      dispatch(addSidebarRoute('kinase', kinaseName));
    };

    const selectRow = () => {
      setSelectedKinase(kinaseName);
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
    [key: string]: (kinaseName: string) => void;
  } = {
    '0': (kinaseName: string) => {
      dispatch(addSidebarRoute('kinase', kinaseName));
      history.push(`/${kinaseName}/description`);
    },
    '2': (uniprotId: string) => {
      window.open(`https://www.uniprot.org/uniprot/${uniprotId}`, '_blank');
    },
  };

  return (
    <GridContainer direction='row' style={{ padding: '2em' }}>
      <GridItem xs={12} lg={6}>
        <CardGeneric
          color='primary'
          cardTitle='Kinases'
          cardSubtitle='Select a kinase'
        >
          {tableData.length === 0 ? (
            <div>Loading...</div>
          ) : (
            <Table
              id='Kinases'
              tableHead={['Sites', 'Name', 'Expressed in', 'Uniprot ID']}
              tableData={tableData}
              RowExpandableContentLeft={KinaseListPhosphosites}
              RowContentRight={RowContentRight}
              clickableCells={clickableCells}
              searchIndex={0}
              selectedItem={selectedKinase}
            />
          )}
        </CardGeneric>
      </GridItem>
      <GridItem xs={12} lg={6}>
        <Slide in={rightPanelOpen} direction='left' mountOnEnter unmountOnExit>
          <div>
            {selectedInfo !== undefined ? (
              <CardGeneric
                color='primary'
                cardTitle='Kinase Specification'
                cardSubtitle='Details'
              >
                <GridContainer direction='column'>
                  <GridItem>
                    <CardGeneric color='primary' cardTitle={selectedKinase}>
                      <p>{selectedInfo.description}</p>
                      <p>
                        <strong>Families: </strong>
                        {selectedInfo.families}
                      </p>
                      <p>
                        <strong>Alternative names: </strong>
                        {selectedInfo.gene_synonyms}
                      </p>
                      <p>
                        <strong>Detected in: </strong>
                        {selectedInfo.expressed_in}
                      </p>
                    </CardGeneric>
                  </GridItem>
                  <GridItem>
                    <NewFindingsCard
                      leftIconTitle='New Perturbagens'
                      leftIconText='6'
                      rightIconText='24'
                      rightIconTitle='New PDTs'
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

export default KinaseList;
