import React, { useEffect, useState, useMemo } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import { fetchFromApi } from 'utils/api';
import CardGeneric from 'components/Misc/Card/CardGeneric';
import Table from 'components/Misc/CustomTable/Table';
import GridItem from 'components/Misc/CustomGrid/GridItem';
import GridContainer from 'components/Misc/CustomGrid/GridContainer';
import { findPerturbagenInfo, formatDataForTable } from './helpers';

interface KnownPerturbagen {
  perturbagen: string;
  score: string;
  source: string;
  chemspider_id: string;
  action: string;
  synonyms: string;
}

const KnownPerturbagens = () => {
  const [data, setData] = useState<KnownPerturbagen[]>([]);
  const [selectedPerturbagen, setSelectedPerturbagen] = useState('');
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const kinase = window.location.href.split('/')[3];

  // Fetch the data
  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetchFromApi('/api/knownPerturbagens', { kinase }).then((res) => {
      if (mounted) {
        setData(res);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [kinase]);

  // Right panel animation
  useEffect(() => {
    setRightPanelOpen(false);

    if (selectedPerturbagen !== '') {
      setTimeout(() => {
        setRightPanelOpen(true);
      }, 300);
    }
  }, [selectedPerturbagen]);

  // Button on the right of the row
  // row prop will come from the table component's row
  const RowContentRight = ({ row }: { row: string[] }) => {
    const perturbagenName = row[0];

    const selectRow = () => {
      setSelectedPerturbagen(perturbagenName);
    };

    return (
      <IconButton aria-label='expand row' size='small' onClick={selectRow}>
        <KeyboardArrowRight />
      </IconButton>
    );
  };

  const clickableCells = {
    '3': (chemspiderId: string) => {
      window.open(`https://chemspider.com/${chemspiderId}`, '_blank');
    },
  };

  // Get specific information about this perturbagen to display in the right panel
  const perturbagenInfo = useMemo(() => {
    return findPerturbagenInfo(data, selectedPerturbagen);
  }, [data, selectedPerturbagen]);

  const chemspiderUrl = perturbagenInfo
    ? `https://www.chemspider.com/ImagesHandler.ashx?id=${perturbagenInfo.chemspider_id}&w=250&h=250`
    : '';

  // Table wants the data in this format :/
  const tableData = formatDataForTable(data);

  return (
    <GridContainer direction='row' justify='space-between' style={{ padding: '2em' }}>
      <GridItem md>
        <CardGeneric color='primary' cardTitle='Known Perturbagens' cardSubtitle='Select a perturbagen'>
          {tableData.length === 0 && !loading ? (
            <div>No entries found</div>
          ) : loading ? (
            <div>Loading...</div>
          ) : (
            <Table
              id={`${kinase}_KnownPerturbagens`}
              tableHead={['Perturbagen', 'Source', 'Score', 'Chemspider ID', '']}
              tableData={tableData}
              searchIndex={0}
              clickableCells={clickableCells}
              RowContentRight={RowContentRight}
              selectedItem={selectedPerturbagen}
            />
          )}
        </CardGeneric>
      </GridItem>
      <GridItem md>
        <CardGeneric
          color='primary'
          cardTitle='Perturbagen Info'
          cardSubtitle='Details'
          bodyStyle={{ minHeight: selectedPerturbagen ? '30rem' : 0 }}
        >
          <Slide in={rightPanelOpen} direction='left' mountOnEnter unmountOnExit>
            <div>
              <GridContainer direction='column'>
                <GridItem>
                  <CardGeneric color='primary' cardTitle={selectedPerturbagen}>
                    <div style={{ textAlign: 'center' }}>
                      <img src={chemspiderUrl} alt='Perturbagen' />
                    </div>
                  </CardGeneric>
                </GridItem>
                <GridItem>
                  {perturbagenInfo ? (
                    <>
                      <p>
                        <strong>Chemspider ID: </strong>
                        {perturbagenInfo.chemspider_id}
                      </p>
                      <p>
                        <strong>Families: </strong>
                        {perturbagenInfo.action}
                      </p>
                      <p>
                        <strong>Alternative names: </strong>
                        {perturbagenInfo.synonyms}
                      </p>
                    </>
                  ) : null}
                </GridItem>
              </GridContainer>
            </div>
          </Slide>
        </CardGeneric>
      </GridItem>
    </GridContainer>
  );
};

export default KnownPerturbagens;
