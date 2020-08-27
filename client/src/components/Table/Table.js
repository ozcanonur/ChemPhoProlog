import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { has, range } from 'lodash';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';

import Search from '@material-ui/icons/Search';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';

import Button from 'components/CustomButtons/Button.js';
import CustomInput from 'components/CustomInput/CustomInput';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/components/tableStyle.js';
const useStyles = makeStyles(styles);

// Each row on the table body
const Row = (props) => {
  const {
    row,
    rowEndArrow,
    handleSelection,
    handleAdd,
    selectedInfo,
    cell_line,
    firstRowOnClick,
    ExtraContent,
  } = props;

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleExpandButton = () => {
    setOpen(!open);
  };

  const ExpandButton = () => (
    <TableCell className={classes.tableCell}>
      <IconButton aria-label='expand row' size='small' onClick={() => handleExpandButton()}>
        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
      </IconButton>
    </TableCell>
  );

  const RightButton = () => (
    <TableCell style={{ textAlign: 'center' }}>
      <IconButton aria-label='expand row' size='small' onClick={() => handleAdd(row[0])}>
        <AddCircleOutline />
      </IconButton>
      <IconButton aria-label='expand row' size='small' onClick={() => handleSelection(row[0])}>
        <KeyboardArrowRight />
      </IconButton>
    </TableCell>
  );

  const RowBody = () =>
    row.map((prop, key) => (
      <React.Fragment key={key}>
        {ExtraContent && key === 0 ? <ExpandButton /> : null}
        <TableCell className={classes.tableCell} key={key}>
          {firstRowOnClick ? (
            <Link
              style={{ color: key === 0 ? '#0066CC' : 'inherit', textDecoration: 'none' }}
              to={`/home/${row[0]}/description`}
              onClick={() => {
                handleAdd(row[0]);
              }}>
              {prop}
            </Link>
          ) : (
            <div>{prop}</div>
          )}
        </TableCell>
        {rowEndArrow && key === row.length - 1 ? <RightButton /> : null}
      </React.Fragment>
    ));

  let currentSelectedEle;
  if (has(selectedInfo, 'kinase_name')) {
    currentSelectedEle = selectedInfo.kinase_name;
  } else if (has(selectedInfo, 'name')) {
    currentSelectedEle = selectedInfo.name;
  }

  return (
    <React.Fragment>
      <TableRow
        key={row}
        className={classes.tableBodyRow}
        style={{
          backgroundColor: row[0] === currentSelectedEle ? 'rgba(255, 152, 0, 0.1)' : 'inherit',
        }}>
        <RowBody />
      </TableRow>
      {ExtraContent !== undefined ? (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
            <Collapse in={open} timeout='auto' mountOnEnter unmountOnExit>
              <Box margin={1}>{<ExtraContent row={row} cell_line={cell_line} />}</Box>
            </Collapse>
          </TableCell>
        </TableRow>
      ) : null}
    </React.Fragment>
  );
};

const CustomTable = (props) => {
  const classes = useStyles();

  const {
    tableHead,
    tableHeaderColor,
    tableData,
    currentPage,
    handleChangePage,
    handleAdd,
    rowEndArrow,
    handleSelection,
    selectedInfo,
    firstRowOnClick,
    ExtraContent,
    cell_line,
  } = props;

  // Pagination options
  const [rowsPerPage, setRowsPerPage] = useState(props.rowsPerPage);
  // Currently displayed values, filtered by the search field
  const [filteredList, setFilteredList] = useState([]);

  const createSortState = () => {
    let length = tableHead.length;
    if (ExtraContent) length -= 1;
    if (rowEndArrow) length -= 1;

    let obj = {};
    for (const x of range(0, length)) {
      if (x === 0) obj[x] = true;
      else obj[x] = false;
    }

    return obj;
  };

  // Sort state
  const [sortedAsc, setSortedAsc] = useState(createSortState());

  useEffect(() => {
    setFilteredList(tableData);
  }, [tableData]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // Filter the values by the search term and set the state
  const filterByTermAndSetTableData = (event) => {
    const filtered = tableData.filter(
      (row) => row[0].toString().toLowerCase().indexOf(event.target.value.toLowerCase()) === 0
    );
    handleChangePage(null, 0);
    setFilteredList(filtered);
  };

  const handleSort = (key) => {
    if (ExtraContent) key = key - 1;

    let sortedList = [];
    if (!sortedAsc[key]) {
      sortedList = filteredList.sort((x, y) => {
        if (x[key] < y[key]) return -1;
        if (x[key] > y[key]) return 1;
        return 0;
      });
    } else {
      sortedList = filteredList.sort((x, y) => {
        if (x[key] > y[key]) return -1;
        if (x[key] < y[key]) return 1;
        return 0;
      });
    }

    setFilteredList([...sortedList]);
    setSortedAsc({ ...sortedAsc, [key]: !sortedAsc[key] });
  };

  const TableHeadContent = () => (
    <TableRow className={classes.tableHeadRow}>
      {tableHead.map((prop, key) => (
        <TableCell
          className={classes.tableCell + ' ' + classes.tableHeadCell}
          style={{ cursor: 'pointer' }}
          key={key}
          onClick={() => handleSort(key)}>
          {prop}
        </TableCell>
      ))}
    </TableRow>
  );

  const TableBodyContent = () =>
    filteredList
      .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
      .map((row, key) => (
        <Row
          key={key}
          {...{
            row,
            rowEndArrow,
            handleSelection,
            selectedInfo,
            handleAdd,
            cell_line,
            firstRowOnClick,
            ExtraContent,
          }}
        />
      ));

  const TablePaginationContent = () => (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component='div'
      count={filteredList.length}
      rowsPerPage={rowsPerPage}
      page={currentPage}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );

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
      <TablePaginationContent />
    </div>
  );
};

export default CustomTable;
