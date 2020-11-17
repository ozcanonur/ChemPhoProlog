/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Loading from 'components/Misc/Loading/Loading';
import CardHeader from 'components/Misc/Card/CardHeader';
import CustomTabs from 'components/Misc/CustomTabs/CustomTabs';
import { fetchFromApi } from 'utils/api';
import GridItem from 'components/Misc/CustomGrid/GridItem';
import GridContainer from 'components/Misc/CustomGrid/GridContainer';
import CardGeneric from 'components/Misc/Card/CardGeneric';
import Table from 'components/Misc/CustomTable/Table';
import { useLocalStorage } from 'utils/customHooks';
import KnownTargets from './KnownTargets';
import HelperPopups from './HelperPopups';

import perturbagensStyles from './styles/perturbagens';

const useStyles = makeStyles(perturbagensStyles);

const PerturbagenList = () => {
  const classes = useStyles();

  const [data, setData] = useState<Perturbagen[]>([]);
  const [selectedPerturbagen, setSelectedPerturbagen] = useLocalStorage('selectedPerturbagen', '');
  const [rightPanelOpen, setRightPanelOpen] = useLocalStorage('perturbagenRightPanelOpen', false);
  const [loading, setLoading] = useState(false);

  // Fetch data on render
  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetchFromApi('/apiWeb/getPerturbagenList').then((res) => {
      if (mounted) {
        setData(res);
        setLoading(false);
      }
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
      }, 300);
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

    const selectRow = () => {
      setSelectedPerturbagen(perturbagenName);
    };

    return (
      <IconButton aria-label='expand row' size='small' onClick={selectRow}>
        <KeyboardArrowRight />
      </IconButton>
    );
  };

  const clickableCells: {
    [key: string]: (perturbagenName: string) => void;
  } = {
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
    <GridContainer direction='row' className={classes.container}>
      <GridItem sm={12} lg={6}>
        <CardGeneric color='primary' cardTitle='Perturbagens' cardSubtitle='Select a perturbagen'>
          {tableData.length === 0 && !loading ? (
            <div>Something went wrong.</div>
          ) : loading ? (
            <Loading />
          ) : (
            <>
              <HelperPopups />
              <Table
                id='Perturbagens'
                tableHead={['Name', 'Chemspider ID', 'Action', 'Synonyms', '']}
                tableData={tableData}
                RowContentRight={RowContentRight}
                clickableCells={clickableCells}
                selectedItem={selectedPerturbagen}
                searchIndex={0}
              />
            </>
          )}
        </CardGeneric>
      </GridItem>
      <GridItem sm={12} lg={6}>
        <CardGeneric
          color='primary'
          cardTitle='Perturbagen Specification'
          cardSubtitle='Details'
          bodyStyle={{ minHeight: selectedPerturbagen ? '30rem' : 0 }}
        >
          <Slide in={rightPanelOpen} direction='left' mountOnEnter unmountOnExit>
            <div>
              <CustomTabs
                headerColor='success'
                tabs={[
                  {
                    tabName: 'Visual',
                    tabIcon: PhotoCameraIcon,
                    tabContent: (
                      <>
                        <CardHeader color='primary' style={{ margin: 0, marginBottom: '1rem', fontSize: '1.1rem' }}>
                          <div style={{ marginBottom: '3px' }}>{selectedPerturbagen}</div>
                        </CardHeader>
                        <div style={{ textAlign: 'center' }}>
                          <img src={chemspiderId} alt='Perturbagen' />
                        </div>
                      </>
                    ),
                  },
                  {
                    tabName: 'Known Targets',
                    tabIcon: SubdirectoryArrowRightIcon,
                    tabContent: <KnownTargets perturbagen={selectedPerturbagen} />,
                  },
                ]}
              />
            </div>
          </Slide>
        </CardGeneric>
      </GridItem>
    </GridContainer>
  );
};

export default PerturbagenList;
