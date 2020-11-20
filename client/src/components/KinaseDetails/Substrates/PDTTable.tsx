import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { playToast, RedirectedToPathwaysToast } from 'components/Misc/Toast/toast';
import Loading from 'components/Misc/Loading/Loading';
import { fetchFromApi } from 'utils/api';
import Button from 'components/Misc/CustomButton/Button';
import CardGeneric from 'components/Misc/Card/CardGeneric';
import Table from 'components/Misc/CustomTable/Table';
import { setSelectedInputs } from 'actions/pathways';
import ObservationBarChart from '../ObservationBarChart';
import { helperPopups } from './PDTTableHelperPopups';

const useStyles = makeStyles({
  button: {
    backgroundColor: 'rgba(17, 59, 94, 0.7)',
    boxShadow: '0,3px,5px,0,rgba(0,0,0,0.2)',
  },
  menu: {
    maxHeight: '30rem',
  },
});

interface Props {
  cellLine: string;
}

interface SubstratesWithPaths {
  [substrate: string]: {
    [cellLine: string]: string;
  };
}

const PDTTable = ({ cellLine }: Props) => {
  const classes = useStyles();

  const [PDTs, setPDTs] = useState([]);
  const [substratesWithPaths, setSubstratesWithPaths] = useState<SubstratesWithPaths>({});
  const [loading, setLoading] = useState(false);
  const [helpersOpen, setHelpersOpen] = useState(false);

  const toggleHelpers = () => {
    setHelpersOpen(!helpersOpen);
  };

  const helpers = { helpers: helperPopups, helpersOpen, toggleHelpers };

  const kinase = window.location.href.split('/')[3];

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    Promise.all([
      fetchFromApi('/api/pdts', { kinase, cell_line: cellLine }),
      fetchFromApi('/apiWeb/substratesWithPaths', { kinase }),
    ]).then(([resPDTs, resSubstratesWithPaths]) => {
      if (mounted && resPDTs && resSubstratesWithPaths) {
        setPDTs(resPDTs);
        setSubstratesWithPaths(resSubstratesWithPaths);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [kinase, cellLine]);

  const tableData = PDTs.map(Object.values);

  // Button on the right of the row
  // row prop will come from the table component's row
  // eslint-disable-next-line
  const DropdownMenu = ({ substrate, cellLine }: { substrate: string; cellLine: string }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
      playToast(
        `RedirectedToPathways_${cellLine}${perturbagen}${substrate}`,
        <RedirectedToPathwaysToast inputs={{ cellLine, perturbagen, substrate }} />
      );
      setAnchorEl(null);
      goToPathways(perturbagen);
    };

    return (
      <>
        <Button onClick={handleClick} size='sm' className={classes.button}>
          <div>{cellLine}</div>
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} className={classes.menu}>
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
        {Object.keys(substrateProps).map((dropdownCellLine) => (
          <DropdownMenu key={dropdownCellLine} substrate={substrate} cellLine={dropdownCellLine} />
        ))}
      </>
    );
  };

  return (
    <CardGeneric
      color='primary'
      cardTitle={`Putative Downstream Targets of ${kinase}`}
      cardSubtitle='Select a substrate'
      bodyStyle={{ minHeight: '40rem' }}
    >
      {tableData.length === 0 && !loading ? (
        <div>No entries found.</div>
      ) : loading ? (
        <Loading />
      ) : (
        <Table
          id={`${cellLine}_${kinase}_PDTTable`}
          tableHead={['Obs.Data', 'Substrate', 'Protein', 'Confidence', 'Shared with', 'Go to Pathway']}
          tableData={tableData}
          RowContentRight={RowContentRight}
          RowExpandableContentLeft={ObservationBarChart(cellLine)}
          searchIndex={0}
          helpers={helpers}
        />
      )}
    </CardGeneric>
  );
};

export default PDTTable;
