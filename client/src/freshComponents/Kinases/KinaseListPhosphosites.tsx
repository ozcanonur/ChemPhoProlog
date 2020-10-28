/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import zip from 'lodash/zip';
import axios from 'axios';

import kinaseListPhosphositesStyles from './styles/kinaseListPhosphosites';

const useStyles = makeStyles(kinaseListPhosphositesStyles);

interface Props {
  row: any;
}

const KinaseListPhosphosites = ({ row }: Props): JSX.Element => {
  const classes = useStyles();

  const [phosphosites, setPhosphosites] = useState<string[]>([]);

  const kinase = row[0];

  // Fetch the phosphosites for this kinase
  useEffect(() => {
    let mounted = true;

    axios.get('/api/phosphosites', { params: { kinase } }).then((res) => {
      if (mounted) setPhosphosites(res.data.map(Object.values).flat());
    });

    return () => {
      mounted = false;
    };
  }, [kinase]);

  const getPhosphositeBySite = (aminoacid: string) => {
    return phosphosites
      .filter((phosphosite) => {
        return phosphosite.includes(`(${aminoacid}`);
      })
      .map((phosphosite) => {
        return phosphosite.substring(
          phosphosite.indexOf('(') + 1,
          phosphosite.length - 1
        );
      });
  };

  // Split the phosphosites per aminoacid
  const dividedPhosphosites = zip(
    getPhosphositeBySite('S'),
    getPhosphositeBySite('T'),
    getPhosphositeBySite('Y')
  );

  return (
    <Table size='small'>
      <TableHead className={classes.warningTableHeader}>
        <TableRow className={classes.tableHeadRow}>
          {['Serine', 'Threonine', 'Tyrosine'].map((header) => {
            return (
              <TableCell
                key={header}
                className={`${classes.tableCell} ${classes.tableHeadCell}`}
              >
                {header}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {dividedPhosphosites.map((phosphositeRow, index1) => (
          <TableRow key={index1}>
            {phosphositeRow.map((phosphosite, index2) => (
              <TableCell scope='row' key={index2} className={classes.tableCell}>
                {phosphosite}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default KinaseListPhosphosites;
