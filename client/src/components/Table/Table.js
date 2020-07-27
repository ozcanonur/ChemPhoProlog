import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import Search from '@material-ui/icons/Search';
import Button from 'components/CustomButtons/Button.js';

import styles from 'assets/jss/material-dashboard-react/components/tableStyle.js';
import { Link } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';

import CustomInput from 'components/CustomInput/CustomInput';

const useStyles = makeStyles(styles);

const Row = (props) => {
  const { row, collapsible, rowHeight } = props;
  const [open, setOpen] = useState(false);
  const [phosphosites, setPhosphosites] = useState([]);

  const classes = useStyles();

  const callApi = async (kinase) => {
    const response = await axios.get('/api/api', {
      params: {
        query: `select distinct substrate_id from Substrate where substrate_id like "%${kinase}(%"`,
      },
    });

    const body = await response.data;

    if (response.status !== 200) throw Error(response.statusText);

    return body;
  };

  return (
    <React.Fragment>
      <TableRow key={row} className={classes.tableBodyRow}>
        {row.map((prop, key) => {
          return (
            <React.Fragment key={key}>
              {collapsible && key === 0 ? (
                <TableCell style={{ textAlign: 'center' }}>
                  <IconButton
                    aria-label='expand row'
                    size='small'
                    onClick={() => {
                      setOpen(!open);
                      if (collapsible) {
                        callApi(prop).then((res) => {
                          setPhosphosites(res.map(Object.values));
                        });
                      }
                    }}
                  >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>
              ) : null}
              <TableCell
                className={classes.tableCell}
                key={key}
                style={{ height: rowHeight }}
              >
                {key === 0 ? (
                  <Link to='#' style={{ color: '#0066CC' }}>
                    {prop}
                  </Link>
                ) : (
                  <React.Fragment>{prop}</React.Fragment>
                )}
              </TableCell>
            </React.Fragment>
          );
        })}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Table size='small'>
                <TableBody>
                  {phosphosites.map((phosphosite) => (
                    <TableRow key={phosphosite}>
                      <TableCell component='th' scope='row'>
                        <Link to='#' style={{ color: '#0066CC' }}>
                          {phosphosite}
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default function CustomTable(props) {
  const classes = useStyles();

  const { tableHead, tableData, tableHeaderColor, rowHeight, collapsible } = props;

  const [rowsPerPage, setRowsPerPage] = useState(props.rowsPerPage);
  const [page, setPage] = useState(0);
  const [filteredList, setFilteredList] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setFilteredList(tableData);
  }, [tableData]);

  const handleSearchTermOnChange = (event) => {
    const filtered = tableData.filter((row) =>
      new RegExp(event.target.value, 'i').test(row[0])
    );

    setFilteredList(filtered);
  };

  return (
    <div className={classes.tableResponsive}>
      <CustomInput
        formControlProps={{
          className: classes.search,
        }}
        inputProps={{
          placeholder: 'Search',
          inputProps: {
            'aria-label': 'Search',
          },
        }}
        onChange={(event) => handleSearchTermOnChange(event)}
      />
      <Button color='white' aria-label='edit' justIcon round>
        <Search />
      </Button>
      <Table className={classes.table}>
        <TableHead
          className={classes[tableHeaderColor + 'TableHeader']}
          style={{ margin: 0 }}
        ></TableHead>
        <TableHead className={classes[tableHeaderColor + 'TableHeader']}>
          <TableRow className={classes.tableHeadRow}>
            {tableHead.map((prop, key) => {
              return (
                <TableCell
                  className={classes.tableCell + ' ' + classes.tableHeadCell}
                  key={key}
                >
                  {prop}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((prop, key) => {
              return (
                <Row
                  key={prop}
                  row={prop}
                  collapsible={collapsible}
                  rowHeight={rowHeight}
                />
              );
            })}
        </TableBody>
      </Table>
      <div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component='div'
          count={filteredList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: 'gray',
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray',
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
};
