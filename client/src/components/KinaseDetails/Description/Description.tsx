/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import GridItem from 'components/Misc/CustomGrid/GridItem';
import GridContainer from 'components/Misc/CustomGrid/GridContainer';
import CardGeneric from 'components/Misc/Card/CardGeneric';
import Table from 'components/Misc/CustomTable/Table';
import Button from 'components/Misc/CustomButton/Button';
import Loading from 'components/Misc/Loading/Loading';

import { setSelectedInputs } from 'actions/pathways';
import { fetchFromApi } from 'utils/api';
import ObservationHeatMap from '../ObservationHeatMap';
import HelperPopups from './HelperPopups';

interface PhosphositeOnKinase {
  detected_in: string;
  location: number;
  pst_effect: string;
  reported_pdt_of: string | null;
  reported_substrate_of: string | null;
  residue: string;
}

interface KinaseInfo {
  description: string;
  families: string;
  gene_synonyms: string;
  expressed_in: string;
}

interface PhosphositesWithPaths {
  [substrate: string]: {
    [cellLine: string]: string;
  };
}

const Description = () => {
  const kinase = window.location.href.split('/')[3];

  const [phosphosites, setPhosphosites] = useState<PhosphositeOnKinase[]>([]);
  const [kinaseInfo, setKinaseInfo] = useState<KinaseInfo>({
    description: '',
    families: '',
    gene_synonyms: '',
    expressed_in: '',
  });
  const [phosphositesWithPaths, setPhosphositesWithPaths] = useState<PhosphositesWithPaths>({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  // Fetch the data
  useEffect(() => {
    let mounted = true;
    setLoading(true);

    Promise.all([
      fetchFromApi('/api/phosphosites', {
        kinase,
        detailed: true,
      }),
      fetchFromApi('/apiWeb/kinaseInfo', { kinase }),
      fetchFromApi('/apiWeb/phosphositesWithPaths', { kinase }),
    ]).then(([resPho, resKinase, resPhosphositesWithPaths]) => {
      if (mounted && resPho && resKinase && resPhosphositesWithPaths) {
        setPhosphosites(resPho);
        setKinaseInfo(resKinase);
        setPhosphositesWithPaths(resPhosphositesWithPaths);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [kinase]);

  const DropdownMenu = ({ substrate, cellLine }: { substrate: string; cellLine: string }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const substrateProps = phosphositesWithPaths[substrate];

    const goToPathways = (perturbagen: string) => {
      dispatch(
        setSelectedInputs({
          substrate,
          cellLine,
          perturbagen,
          onlyKinaseEnds: false,
        })
      );
      history.push('/pathways');
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleSelect = (_e: React.MouseEvent<HTMLElement>, perturbagen: string) => {
      setAnchorEl(null);
      goToPathways(perturbagen);
    };

    const handleClick = (event: any) => {
      setAnchorEl(event.currentTarget);
    };

    return (
      <>
        <Button
          onClick={handleClick}
          size='sm'
          style={{
            backgroundColor: 'rgba(17, 59, 94, 0.7)',
            boxShadow: '0,3px,5px,0,rgba(0,0,0,0.2)',
          }}
        >
          <div>{cellLine}</div>
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} style={{ maxHeight: '30rem' }}>
          {substrateProps[cellLine].split(',').map((perturbagen) => (
            <MenuItem key={perturbagen} onClick={(e) => handleSelect(e, perturbagen)}>
              {perturbagen}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  };

  // Button on the right of the row
  // row prop will come from the table component's row
  const RowContentRight = ({ row }: { row: string[] }) => {
    const substrate = `${kinase}(${row[1]}${row[0]})`;
    const substrateProps = phosphositesWithPaths[substrate];

    if (!substrateProps) return <div>No pathway available</div>;

    return (
      <>
        {Object.keys(substrateProps).map((cellLine: string) => (
          <DropdownMenu key={cellLine} substrate={substrate} cellLine={cellLine} />
        ))}
      </>
    );
  };

  // Table component wants it in this format :/
  const tableData = phosphosites.map(Object.values);

  const rowExpandableContentLeftFilter = phosphosites
    .filter((phosphosite) => phosphosite.detected_in)
    .map((phosphosite) => phosphosite.location.toString());

  return (
    <GridContainer direction='column' style={{ padding: '2em' }}>
      <GridItem>
        <CardGeneric color='primary' cardTitle={kinase}>
          <p>{kinaseInfo.description}</p>
          <p>
            <strong>Families: </strong>
            {kinaseInfo.families}
          </p>
          <p>
            <strong>Alternative names: </strong>
            {kinaseInfo.gene_synonyms}
          </p>
          <p>
            <strong>Detected in: </strong>
            {kinaseInfo.expressed_in}
          </p>
        </CardGeneric>
      </GridItem>
      <GridItem>
        <CardGeneric color='primary' cardTitle={`Phosphosites on ${kinase}`} cardSubtitle='Select a phosphosite'>
          {tableData.length === 0 && !loading ? (
            <div>No entries found.</div>
          ) : loading ? (
            <Loading />
          ) : (
            <>
              <HelperPopups />
              <Table
                id={`${kinase}_PhosphositesOfInterest`}
                tableHead={[
                  'Obs. Data',
                  'Location',
                  'Residue',
                  'Detected in',
                  'Pst_effect',
                  'Reported Substrate of',
                  'Reported PDT of',
                  'Go to Pathway',
                ]}
                tableData={tableData}
                RowExpandableContentLeft={ObservationHeatMap(false)}
                RowExpandableContentLeftFilter={rowExpandableContentLeftFilter}
                RowContentRight={RowContentRight}
                searchIndex={0}
              />
            </>
          )}
        </CardGeneric>
      </GridItem>
    </GridContainer>
  );
};

export default Description;
