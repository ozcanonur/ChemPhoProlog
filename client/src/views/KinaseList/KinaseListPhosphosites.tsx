import React, { useEffect, useState } from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import zip from 'lodash/zip';
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@material-ui/core';

import { getApi } from 'api/api';

const useStyles = makeStyles({
  warningTableHeader: {
    color: '#FFC107',
  },
  tableHeadCell: {
    color: 'inherit',
    '&, &$tableCell': {
      fontSize: '1em',
    },
  },
  tableCell: {
    minHeight: '1.72857143',
    padding: '12px 8px',
    verticalAlign: 'middle',
    fontSize: '0.8125rem',
  },
  tableHeadRow: {
    height: '56px',
    color: 'inherit',
    display: 'table-row',
    outline: 'none',
    verticalAlign: 'middle',
  },
});

const KinaseListPhosphosites = ({ row }) => {
  const classes = useStyles();

  const [phosphosites, setPhosphosites] = useState([]);

  const kinase = row[0];

  useEffect(() => {
    let mounted = true;
    const route = '/phosphosites';
    const params = { kinase };

    getApi(route, params).then((res) => {
      if (mounted) {
        setPhosphosites(res.map(Object.values));
      }
    });

    return () => {
      mounted = false;
    };
  }, [kinase]);

  const getPhosphositeBySite = (phosphosites, aminoacid) => {
    return phosphosites
      .filter((phosphosite) => {
        return phosphosite[0].includes(`(${aminoacid}`);
      })
      .map((phosphosite) => {
        return phosphosite[0].substring(
          phosphosite[0].indexOf('(') + 1,
          phosphosite[0].length - 1
        );
      });
  };

  // Divide and CONQUER the phosphosites into categories
  const phosphosites_S = getPhosphositeBySite(phosphosites, 'S');
  const phosphosites_T = getPhosphositeBySite(phosphosites, 'T');
  const phosphosites_Y = getPhosphositeBySite(phosphosites, 'Y');
  const dividedPhosphosites = zip(
    phosphosites_S,
    phosphosites_T,
    phosphosites_Y
  );

  const headers = ['Serine', 'Threonine', 'Tyrosine'];

  return (
    <Table size='small'>
      <TableHead className={classes.warningTableHeader}>
        <TableRow className={classes.tableHeadRow}>
          {headers.map((prop, key) => {
            return (
              <TableCell
                key={key}
                className={`${classes.tableCell} ${classes.tableHeadCell}`}
              >
                {prop}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {dividedPhosphosites.map((phosphosites, key) => (
          <TableRow key={key}>
            {phosphosites.map((phosphosite, key) => (
              <TableCell
                scope='row'
                key={key}
                className={classes.tableCell}
                style={{ color: '#0066CC' }}
              >
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
