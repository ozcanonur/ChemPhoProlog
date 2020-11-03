import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { fetchFromApi } from 'utils/api';
import Button from 'components/Misc/CustomButton/Button';
import CardGeneric from 'components/Misc/Card/CardGeneric';
import Table from 'components/Misc/CustomTable/Table';
import { setSelectedInputs } from 'actions/pathways';
import ObservationBarChart from '../ObservationBarChart';

interface Props {
  cellLine: string;
}

interface SubstratesWithPaths {
  [substrate: string]: {
    [cellLine: string]: string;
  };
}

const PDTTable = ({ cellLine }: Props) => {
  const [PDTs, setPDTs] = useState([]);
  const [substratesWithPaths, setSubstratesWithPaths] = useState<SubstratesWithPaths>({});

  const kinase = window.location.href.split('/')[3];

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    let mounted = true;

    Promise.all([
      fetchFromApi('/api/pdts', { kinase, cell_line: cellLine }),
      fetchFromApi('/apiWeb/substratesWithPaths', { kinase }),
    ]).then(([resPDTs, resSubstratesWithPaths]) => {
      if (mounted && resPDTs && resSubstratesWithPaths) {
        setPDTs(resPDTs);
        setSubstratesWithPaths(resSubstratesWithPaths);
      }
    });

    return () => {
      mounted = false;
    };
  }, [kinase, cellLine]);

  const tableData = PDTs.map(Object.values);

  // Button on the right of the row
  // row prop will come from the table component's row
  const RowContentRight = ({ row }: { row: string[] }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const substrate = row[0];
    const substrateProps = substratesWithPaths[substrate];

    if (!substrateProps) return <div>No pathway available</div>;

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
    };

    return (
      <>
        <Button
          onClick={handleClick}
          size='sm'
          style={{
            backgroundColor: 'rgba(45, 65, 89, 0.7)',
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

  return (
    <CardGeneric color='primary' cardTitle={`Putative Downstream Targets of ${kinase}`} cardSubtitle='Select a substrate'>
      {tableData.length === 0 ? (
        <div>No entries found.</div>
      ) : (
        <Table
          id={`${cellLine}_${kinase}_PDTTable`}
          tableHead={['Obs.Data', 'Substrate', 'Protein', 'Confidence', 'Shared with', 'Go to Pathway']}
          tableData={tableData}
          RowContentRight={RowContentRight}
          RowExpandableContentLeft={ObservationBarChart(cellLine)}
          searchIndex={0}
        />
      )}
    </CardGeneric>
  );
};

export default PDTTable;
