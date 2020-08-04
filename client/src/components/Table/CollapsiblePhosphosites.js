import React, { useEffect, useState } from 'react';

import { zip } from 'lodash';
import { CallApi } from 'api/api';

import { Table, TableHead, TableRow, TableBody, TableCell, Box } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/components/tableStyle.js';
const useStyles = makeStyles(styles);

const CollapsiblePhosphosites = ({ kinase }) => {
  const classes = useStyles();

  const [phosphosites, setPhosphosites] = useState([]);

  useEffect(() => {
    const query = `select distinct substrate_id from Substrate where substrate_id like "%${kinase}(%"`;

    CallApi(query).then((res) => {
      setPhosphosites(res.map(Object.values));
    });
  }, [kinase]);

  const getPhosphositeBySite = (phosphosites, aminoacid) => {
    return phosphosites
      .filter((phosphosite) => {
        return phosphosite[0].includes(`(${aminoacid}`);
      })
      .map((phosphosite) => {
        return phosphosite[0].substring(phosphosite[0].indexOf('(') + 1, phosphosite[0].length - 1);
      });
  };

  // Divide and CONQUER the phosphosites into categories
  const phosphosites_S = getPhosphositeBySite(phosphosites, 'S');
  const phosphosites_T = getPhosphositeBySite(phosphosites, 'T');
  const phosphosites_Y = getPhosphositeBySite(phosphosites, 'Y');
  const dividedPhosphosites = zip(phosphosites_S, phosphosites_T, phosphosites_Y);

  const headers = ['Serine', 'Threonine', 'Tyrosine'];

  return (
    <Box margin={1}>
      <Table size='small'>
        <TableHead className={classes['warningTableHeader']}>
          <TableRow className={classes.tableHeadRow}>
            {headers.map((prop, key) => {
              return (
                <TableCell key={key} className={classes.tableCell + ' ' + classes.tableHeadCell}>
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
                  style={{ color: '#0066CC' }}>
                  {phosphosite}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default CollapsiblePhosphosites;
