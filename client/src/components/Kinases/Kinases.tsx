/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { playToast, SidebarRouteAddedToast } from 'components/Misc/Toast/toast';
import { fetchFromApi } from 'utils/api';
import GridItem from 'components/Misc/CustomGrid/GridItem';
import GridContainer from 'components/Misc/CustomGrid/GridContainer';
import CardGeneric from 'components/Misc/Card/CardGeneric';
import Table from 'components/Misc/CustomTable/Table';
import Loading from 'components/Misc/Loading/Loading';
import { useLocalStorage } from 'utils/customHooks';
import NewFindingsCard from 'components/Misc/NewFindings/NewFindingsCard';
import { addSidebarRoute } from 'actions/main';
import Phosphosites from './Phosphosites';
import { formatTableData, findKinaseInfo } from './helpers';
import HelperPopups from './HelperPopups';

import kinaseListPhosphositesStyles from './styles/kinases';

const useStyles = makeStyles(kinaseListPhosphositesStyles);

interface KinaseData {
  data: Kinase[];
  kinasesWithPhosphosites: string[];
}

// Kinase List on the Home page
const KinaseList = () => {
  const classes = useStyles();

  const [data, setData] = useState<KinaseData>({ data: [], kinasesWithPhosphosites: [] });
  const [selectedKinase, setSelectedKinase] = useLocalStorage('selectedKinase', '');
  const [rightPanelOpen, setRightPanelOpen] = useLocalStorage('kinaseRightPanelOpen', false);
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  // Fetch data on render
  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetchFromApi('/apiWeb/kinases').then((res) => {
      if (mounted && res) {
        setData(res);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  // Table data
  const tableData = useMemo(() => {
    return formatTableData(data.data);
  }, [data]);

  // Right panel animation
  useEffect(() => {
    setRightPanelOpen(false);

    if (selectedKinase !== '') {
      setTimeout(() => {
        setRightPanelOpen(true);
      }, 300);
    }
  }, [selectedKinase]);

  // Get specific information about this kinase to display in the right panel
  const selectedInfo = useMemo(() => {
    return findKinaseInfo(data.data, selectedKinase);
  }, [data, selectedKinase]);

  // Button on the right of the row
  // row prop will come from the table component's row
  const RowContentRight = ({ row }: { row: string[] }) => {
    const kinaseName = row[0];

    const addToSidebar = () => {
      dispatch(addSidebarRoute(kinaseName));
      playToast(`Sidebar_${kinaseName}`, <SidebarRouteAddedToast kinase={kinaseName} />);
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
    [key: string]: (field: string) => void;
  } = {
    '0': (kinaseName) => {
      dispatch(addSidebarRoute(kinaseName));
      history.push(`/${kinaseName}/description`);
    },
    '2': (uniprotId) => {
      window.open(`https://www.uniprot.org/uniprot/${uniprotId}`, '_blank');
    },
  };

  const KinaseDescription = () => {
    return selectedInfo ? (
      <>
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
      </>
    ) : null;
  };

  return (
    <GridContainer direction='row' className={classes.container}>
      <GridItem xs={12} lg={6}>
        <CardGeneric color='primary' cardTitle='Kinases' cardSubtitle='Select a kinase'>
          {tableData.length === 0 && !loading ? (
            <div>Something went wrong.</div>
          ) : loading ? (
            <Loading />
          ) : (
            <>
              <HelperPopups />
              <Table
                id='Kinases'
                tableHead={['Sites', 'Name', 'Expressed in', 'Uniprot ID', '']}
                tableData={tableData}
                RowExpandableContentLeft={Phosphosites}
                RowExpandableContentLeftFilter={data.kinasesWithPhosphosites}
                RowContentRight={RowContentRight}
                clickableCells={clickableCells}
                searchIndex={0}
                selectedItem={selectedKinase}
              />
            </>
          )}
        </CardGeneric>
      </GridItem>
      <GridItem xs={12} lg={6}>
        <CardGeneric
          color='primary'
          cardTitle='Kinase Specification'
          cardSubtitle='Details'
          bodyStyle={{ minHeight: selectedKinase ? '40.78rem' : 0 }}
        >
          <Slide in={rightPanelOpen} direction='left' mountOnEnter unmountOnExit>
            <div>
              <GridContainer direction='column'>
                <GridItem>
                  <CardGeneric color='primary' cardTitle={selectedKinase}>
                    <KinaseDescription />
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
            </div>
          </Slide>
        </CardGeneric>
      </GridItem>
    </GridContainer>
  );
};

export default KinaseList;
