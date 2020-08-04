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
import CustomInput from 'components/CustomInput/CustomInput';

import styles from 'assets/jss/material-dashboard-react/components/tableStyle.js';
import { Link } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';

import { zip, has } from 'lodash';

const useStyles = makeStyles(styles);

// Each row on the table body
const Row = ({ row, collapsible, rowEndArrow, handleSelection, handleAdd, selectedInfo }) => {
  // Collapsible open or not
  const [open, setOpen] = useState(false);
  // Phosphosites for each kinase
  const [phosphosites, setPhosphosites] = useState([]);

  const classes = useStyles();

  // Get the phosphosite list for the selected kinase
  const callApi = async (kinase) => {
    const response = await axios.get('/api/api', {
      params: {
        query: `select distinct substrate_id from Substrate where substrate_id like "%${kinase}(%"`,
      },
    });

    if (response.status !== 200) throw Error(response.statusText);

    return await response.data;
  };

  // Expand > calls API and sets collapsible phosphosites state
  const handleExpandButton = (prop) => {
    setOpen(!open);
    if (!open && collapsible) {
      callApi(prop).then((res) => {
        setPhosphosites(res.map(Object.values));
      });
    }
  };

  let currentSelectedEle;
  if (has(selectedInfo, 'kinase_name')) {
    currentSelectedEle = selectedInfo.kinase_name;
  } else if (has(selectedInfo, 'name')) {
    currentSelectedEle = selectedInfo.name;
  }

  // Actual rows
  const MainTableBody = () => {
    return (
      <TableRow
        key={row}
        className={classes.tableBodyRow}
        style={{
          backgroundColor: row[0] === currentSelectedEle ? 'rgba(255, 152, 0, 0.1)' : 'inherit',
        }}
      >
        {row.map((prop, key) => {
          return (
            <React.Fragment key={key}>
              {collapsible && key === 0 ? (
                <TableCell className={classes.tableCell}>
                  <IconButton aria-label='expand row' size='small' onClick={() => handleExpandButton(prop)}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>
              ) : null}
              <TableCell className={classes.tableCell} key={key}>
                {key === 0 ? (
                  <Link to='#' style={{ color: '#0066CC' }}>
                    {prop}
                  </Link>
                ) : (
                  <React.Fragment>{prop}</React.Fragment>
                )}
              </TableCell>
              {rowEndArrow && key === row.length - 1 ? (
                <TableCell style={{ textAlign: 'center' }}>
                  <IconButton aria-label='expand row' size='small' onClick={() => handleAdd(row[0])}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                  <IconButton aria-label='expand row' size='small' onClick={() => handleSelection(row[0])}>
                    <KeyboardArrowRightIcon />
                  </IconButton>
                </TableCell>
              ) : null}
            </React.Fragment>
          );
        })}
      </TableRow>
    );
  };

  // Collapsible phosphosites
  const CollapsibleSubTable = () => {
    const headers = ['Serine', 'Threonine', 'Tyrosine'];

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

    // Collapsible phosphosites rows, divided into categories as JSX
    const PhosphositesRows = (dividedPhosphosites) => {
      return dividedPhosphosites.map((phosphosites) => (
        <TableRow key={phosphosites}>
          <TableCell scope='row' className={classes.tableCell}>
            <Link to='#' style={{ color: '#0066CC' }}>
              {phosphosites[0]}
            </Link>
          </TableCell>
          <TableCell scope='row' className={classes.tableCell}>
            <Link to='#' style={{ color: '#0066CC' }}>
              {phosphosites[1]}
            </Link>
          </TableCell>
          <TableCell scope='row' className={classes.tableCell}>
            <Link to='#' style={{ color: '#0066CC' }}>
              {phosphosites[2]}
            </Link>
          </TableCell>
        </TableRow>
      ));
    };

    return (
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Table size='small'>
                <TableHead className={classes['warningTableHeader']}>
                  <TableRow className={classes.tableHeadRow}>
                    {headers.map((prop, key) => {
                      return (
                        <TableCell className={classes.tableCell + ' ' + classes.tableHeadCell} key={key}>
                          {prop}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>{PhosphositesRows(dividedPhosphosites)}</TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <React.Fragment>
      <MainTableBody />
      <CollapsibleSubTable />
    </React.Fragment>
  );
};

export default function CustomTable(props) {
  const classes = useStyles();

  const {
    tableHead,
    tableHeaderColor,
    collapsible,
    rowEndArrow,
    handleSelection,
    tableData,
    selectedInfo,
    handleAdd,
    currentPage,
    handleChangePage,
  } = props;

  // Pagination options
  const [rowsPerPage, setRowsPerPage] = useState(props.rowsPerPage);

  // Currently displayed values, filtered by the search field
  const [filteredList, setFilteredList] = useState([]);

  // Mount > display all values
  useEffect(() => {
    setFilteredList(tableData);
  }, [tableData]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // Filter the values by the search term and set the state
  const filterByTermAndSetTableData = (event) => {
    const filtered = tableData.filter((row) => new RegExp(event.target.value, 'i').test(row[0]));
    handleChangePage(null, 0);
    setFilteredList(filtered);
  };

  // const handleSort = (key) => {
  //   const sortedList = filteredList.sort((x, y) => {
  //     if (x[key - 1] < y[key - 1]) return -1;
  //     if (x[key - 1] < y[key - 1]) return 1;
  //     return 0;
  //   });
  //   console.log(key);
  //   console.log(sortedList);
  // };

  // Table head
  const TableHeadContent = () => {
    return (
      <TableRow className={classes.tableHeadRow}>
        {tableHead.map((prop, key) => {
          return (
            <TableCell
              className={classes.tableCell + ' ' + classes.tableHeadCell}
              key={key}
              // onClick={() => handleSort(key)}
            >
              {prop}
            </TableCell>
          );
        })}
      </TableRow>
    );
  };

  // Table body
  const TableBodyContent = () => {
    return filteredList
      .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
      .map((prop, key) => {
        return (
          <Row
            key={key}
            row={prop}
            collapsible={collapsible}
            rowEndArrow={rowEndArrow}
            handleSelection={handleSelection}
            selectedInfo={selectedInfo}
            handleAdd={handleAdd}
          />
        );
      });
  };

  return (
    <div className={classes.tableResponsive}>
      <div style={{ textAlign: 'right' }}>
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
          onChange={(event) => filterByTermAndSetTableData(event)}
        />
        <Button color='white' aria-label='edit' justIcon round>
          <Search />
        </Button>
      </div>
      <Table stickyHeader className={classes.table}>
        <TableHead className={classes[tableHeaderColor + 'TableHeader']}>
          <TableHeadContent />
        </TableHead>
        <TableBody>
          <TableBodyContent />
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={filteredList.length}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: 'gray',
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf(['warning', 'primary', 'danger', 'success', 'info', 'rose', 'gray']),
  tableHead: PropTypes.arrayOf(PropTypes.string),
};
