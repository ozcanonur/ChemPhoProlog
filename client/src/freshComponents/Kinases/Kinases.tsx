import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import CardGeneric from 'components/Card/CardGeneric';
import Table from 'components/Table/Table';
import Slide from '@material-ui/core/Slide';
import pick from 'lodash/pick';
import axios from 'axios';

import NewFindingsCard from 'freshComponents/Misc/NewFindingsCard';
import { addSidebarRoute } from 'actions/main';
import { shortenExpressedIns } from 'utils/utils';
import KinaseListPhosphosites from './KinaseListPhosphosites';

// Kinase List on the Home page
const KinaseList = (): JSX.Element => {
  const [data, setData] = useState<Kinase[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedKinase, setSelectedKinase] = useState('');
  const [rightPanelOpen, setRightPanelOpen] = useState(false);

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
    return shortenExpressedIns(relevantFieldsPicked).map(Object.values);
  }, [data]);

  // On page change
  const handlePageChange = (_event: Event, page: number) => {
    setCurrentPage(page);
  };

  // Select item
  const handleSelection = (kinase: string) => {
    setSelectedKinase(kinase);
  };

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

  // Handler for adding to the sidebar
  const dispatch = useDispatch();
  const handleKinaseAdd = (kinase: string) => {
    dispatch(addSidebarRoute('kinase', kinase));
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
              className='my-node'
              tableHeaderColor='primary'
              tableHead={['Sites', 'Name', 'Expressed', 'Uniprot ID', '']}
              tableData={tableData}
              rowsPerPage={10}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              rowEndArrow
              handleSelection={handleSelection}
              handleAdd={handleKinaseAdd}
              firstRowOnClick
              ExtraContent={KinaseListPhosphosites}
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
