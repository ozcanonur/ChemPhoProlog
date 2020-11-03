/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { fetchFromApi } from 'utils/api';
import kinaseListPhosphositesStyles from './styles/kinaseListPhosphosites';
import { formatPhosphosites } from './helpers';

const useStyles = makeStyles(kinaseListPhosphositesStyles);

interface Props {
  row: string[];
}

const KinaseListPhosphosites = ({ row }: Props) => {
  const classes = useStyles();

  const [phosphosites, setPhosphosites] = useState<any[][]>([]);

  const kinase = row[0];

  // Fetch the phosphosites for this kinase
  useEffect(() => {
    let mounted = true;

    fetchFromApi('/api/phosphosites', { kinase }).then((res) => {
      if (mounted && res) setPhosphosites(formatPhosphosites(res));
    });

    return () => {
      mounted = false;
    };
  }, [kinase]);

  return (
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
        {phosphosites
          ? phosphosites.map((phosphositeRow, index1) => (
              <TableRow key={index1}>
                {phosphositeRow.map((phosphosite, index2) => (
                  <TableCell scope='row' key={index2} className={classes.tableCell}>
                    {phosphosite}
                  </TableCell>
                ))}
              </TableRow>
            ))
          : null}
      </TableBody>
    </Table>
  );
};

export default KinaseListPhosphosites;
