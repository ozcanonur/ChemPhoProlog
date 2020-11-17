import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { pick } from 'lodash';

import { playToast, RedirectedToPathwaysToast } from 'components/Misc/Toast/toast';
import Loading from 'components/Misc/Loading/Loading';
import { fetchFromApi } from 'utils/api';
import CardGeneric from 'components/Misc/Card/CardGeneric';
import Button from 'components/Misc/CustomButton/Button';
import Table from 'components/Misc/CustomTable/Table';
import { setSelectedInputs } from 'actions/pathways';
import ObservationHeatMap from '../ObservationHeatMap';
import HelperPopups from './KnownSubstratesHelperPopups';

interface KnownSubstrate {
  pst: string;
  sources: string;
  observation_exists: boolean;
}

interface SubstratesWithPaths {
  [substrate: string]: {
    [cellLine: string]: string;
  };
}

const KnownSubstratesTable = () => {
  const [data, setData] = useState<KnownSubstrate[]>([]);
  const [substratesWithPaths, setSubstratesWithPaths] = useState<SubstratesWithPaths>({});
  const [loading, setLoading] = useState(false);

  const kinase = window.location.href.split('/')[3];

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    Promise.all([
      fetchFromApi('/api/knownSubstrates', { KPa: kinase }),
      fetchFromApi('/apiWeb/substratesWithPaths', { kinase }),
    ]).then(([resKnownSubstrates, resSubstratesWithPaths]) => {
      if (mounted && resKnownSubstrates && resSubstratesWithPaths) {
        setData(resKnownSubstrates);
        setSubstratesWithPaths(resSubstratesWithPaths);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [kinase]);

  const DropdownMenu = ({ substrate, cellLine }: { substrate: string; cellLine: string }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const substrateProps = substratesWithPaths[substrate];

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

    const handleClick = (event: any) => {
      setAnchorEl(event.currentTarget);
    };

    const handleSelect = (_e: React.MouseEvent<HTMLElement>, perturbagen: string) => {
      setAnchorEl(null);
      goToPathways(perturbagen);
      playToast(
        `RedirectedToPathways_${cellLine}${perturbagen}${substrate}`,
        <RedirectedToPathwaysToast inputs={{ cellLine, perturbagen, substrate }} />
      );
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
    const substrate = row[0];
    const substrateProps = substratesWithPaths[substrate];

    if (!substrateProps) return <div>No pathway available</div>;

    return (
      <>
        {Object.keys(substrateProps).map((cellLine: string) => (
          <DropdownMenu key={cellLine} substrate={substrate} cellLine={cellLine} />
        ))}
      </>
    );
  };

  const tableData = data.map((e) => pick(e, ['pst', 'sources'])).map(Object.values);
  const rowExpandableContentLeftFilter = data.filter((e) => e.observation_exists).map((e) => e.pst);

  return (
    <>
      {tableData.length === 0 && !loading ? (
        <div>No entries found.</div>
      ) : loading ? (
        <Loading />
      ) : (
        <CardGeneric color='primary' cardTitle='Known Substrates' cardSubtitle='Select a substrate'>
          <>
            <HelperPopups />
            <Table
              id={`${kinase}_KnownSubstrates`}
              tableHead={['Obs.Data', 'Substrate', 'Sources', 'Go to Pathway']}
              tableData={tableData}
              searchIndex={0}
              RowContentRight={RowContentRight}
              RowExpandableContentLeft={ObservationHeatMap(true)}
              RowExpandableContentLeftFilter={rowExpandableContentLeftFilter}
            />
          </>
        </CardGeneric>
      )}
    </>
  );
};

export default KnownSubstratesTable;
