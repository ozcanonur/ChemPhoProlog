/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { playToast, RedirectedToPathwaysToast } from 'components/Misc/Toast/toast';
import Loading from 'components/Misc/Loading/Loading';
import { ReactComponent as MCFSVG } from 'assets/img/M.svg';
import { ReactComponent as HLSVG } from 'assets/img/H.svg';
import { ReactComponent as NTERASVG } from 'assets/img/N.svg';
import Button from 'components/Misc/CustomButton/Button';
import { setSelectedInputs } from 'actions/pathways';
import { fetchFromApi } from 'utils/api';
import kinaseListPhosphositesStyles from './styles/kinaseListPhosphosites';
import { formatPhosphosites } from './helpers';

const useStyles = makeStyles(kinaseListPhosphositesStyles);

interface Props {
  row: string[];
}

interface PhosphositesWithPaths {
  [substrate: string]: {
    [cellLine: string]: string;
  };
}

const Phosphosites = ({ row }: Props) => {
  const classes = useStyles();

  const [phosphosites, setPhosphosites] = useState<any[][]>([]);
  const [phosphositesWithPaths, setPhosphositesWithPaths] = useState<PhosphositesWithPaths>({});
  const [loading, setLoading] = useState(false);

  const kinase = row[0];

  const dispatch = useDispatch();
  const history = useHistory();

  // Fetch the phosphosites for this kinase
  useEffect(() => {
    let mounted = true;
    setLoading(true);

    Promise.all([fetchFromApi('/api/phosphosites', { kinase }), fetchFromApi('/apiWeb/phosphositesWithPaths', { kinase })]).then(
      ([resPhosphosites, resPhosphositesWithPaths]) => {
        if (mounted && resPhosphosites && resPhosphositesWithPaths) {
          setPhosphosites(formatPhosphosites(resPhosphosites));
          setPhosphositesWithPaths(resPhosphositesWithPaths);
          setLoading(false);
        }
      }
    );

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

    const handleClick = (event: any) => {
      setAnchorEl(event.currentTarget);
    };

    const handleSelect = (_e: React.MouseEvent<HTMLElement>, perturbagen: string) => {
      playToast(
        `RedirectToPathways_${cellLine}${perturbagen}${substrate}`,
        <RedirectedToPathwaysToast inputs={{ cellLine, perturbagen, substrate }} />
      );
      setAnchorEl(null);
      goToPathways(perturbagen);
    };

    return (
      <>
        <Button onClick={handleClick} size='sm' className={classes.button}>
          {cellLine === 'MCF-7' ? (
            <MCFSVG className={classes.svg} />
          ) : cellLine === 'HL-60' ? (
            <HLSVG className={classes.svg} />
          ) : cellLine === 'NTERA-2 clone D1' ? (
            <NTERASVG className={classes.svg} />
          ) : undefined}
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

  return (
    <>
      {phosphosites.length === 0 && !loading ? (
        <div>No phosphosites on this kinase.</div>
      ) : loading ? (
        <Loading />
      ) : (
        <Table size='small'>
          <TableHead className={classes.warningTableHeader}>
            <TableRow className={classes.tableHeadRow}>
              {['Serine', 'Threonine', 'Tyrosine'].map((header) => {
                return (
                  <TableCell key={header} className={`${classes.tableCell} ${classes.tableHeadCell}`}>
                    {header}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {phosphosites.map((phosphositeRow, index1) => (
              <TableRow key={index1}>
                {phosphositeRow.map((phosphosite, index2) => {
                  const substrate = `${kinase}(${phosphosite})`;
                  const substrateProps = phosphositesWithPaths[substrate];
                  return (
                    <TableCell scope='row' key={index2} className={classes.tableCell}>
                      <div className={classes.phosphositeCell}>
                        <span>{phosphosite}</span>
                        {substrateProps
                          ? Object.keys(substrateProps).map((cellLine: string) => (
                              <DropdownMenu key={cellLine} substrate={substrate} cellLine={cellLine} />
                            ))
                          : null}
                      </div>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default Phosphosites;
