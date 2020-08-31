import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import range from 'lodash/range';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import Button from 'components/CustomButtons/Button';
import CustomInput from 'components/CustomInput/CustomInput';

import Search from '@material-ui/icons/Search';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/components/tableStyle';

const useStyles = makeStyles(styles);

// Each row on the table body
const Row = (props) => {
  const {
    row,
    rowEndArrow,
    handleSelection,
    handleAdd,
    firstRowOnClick,
    ExtraContent,
    selectedItem,
    cell_line,
    handleAddPath,
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

  const SelectionButton = () => (
    <IconButton aria-label='expand row' size='small' onClick={() => handleSelection(row[0])}>
      <KeyboardArrowRight />
    </IconButton>
  );

  const AddButton = () => (
    <IconButton aria-label='expand row' size='small' onClick={() => handleAdd(row[0])}>
      <AddCircleOutline />
    </IconButton>
  );

  const AddButtonPath = () => (
    <Button onClick={() => handleAddPath(row)} size='sm' style={{ backgroundColor: 'rgba(45, 65, 89, 0.7)' }}>
      Add to inspection
    </Button>
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
              }}
            >
              {prop}
            </Link>
          ) : (
            <>{prop}</>
          )}
        </TableCell>
        {rowEndArrow && key === row.length - 1 ? (
          <TableCell style={{ textAlign: 'center' }}>
            {handleAdd ? <AddButton /> : null}
            {handleSelection ? <SelectionButton /> : null}
            {handleAddPath ? <AddButtonPath /> : null}
          </TableCell>
        ) : null}
      </React.Fragment>
    ));

  return (
    <>
      <TableRow
        key={row}
        className={classes.tableBodyRow}
        style={{
          backgroundColor: row[0] === selectedItem ? 'rgba(229,173,6, 0.1)' : 'inherit',
        }}
      >
        <RowBody />
      </TableRow>
      {ExtraContent !== undefined ? (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
            <Collapse in={open} timeout='auto' mountOnEnter unmountOnExit>
              <Box margin={1}>
                <ExtraContent row={row} cell_line={cell_line} />
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      ) : null}
    </>
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
    firstRowOnClick,
    ExtraContent,
    cell_line,
    selectedItem,
    handleAddPath,
  } = props;

  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    setFilteredList(tableData);
  }, [tableData]);

  // eslint-disable-next-line react/destructuring-assignment
  const [rowsPerPage, setRowsPerPage] = useState(props.rowsPerPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // Currently displayed values, filtered by the search field
  const createSortState = () => {
    let { length } = tableHead;
    if (ExtraContent) length -= 1;
    if (rowEndArrow) length -= 1;

    const obj = {};
    range(0, length).forEach((x) => {
      if (x === 0) obj[x] = true;
      else obj[x] = false;
    });

    return obj;
  };

  // Sort state
  const [sortedAsc, setSortedAsc] = useState(createSortState());

  const handleSort = (key) => {
    // eslint-disable-next-line no-param-reassign
    if (ExtraContent) key -= 1;

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

  // Filter the values by the search term and set the state
  const filterByTermAndSetTableData = (event) => {
    const filtered = tableData.filter(
      (row) => row[0].toString().toLowerCase().indexOf(event.target.value.toLowerCase()) === 0
    );
    handleChangePage(null, 0);
    setFilteredList(filtered);
  };

  const TableHeadContent = () => (
    <TableRow className={classes.tableHeadRow}>
      {tableHead.map((prop, key) => {
        const textAlign = key === tableHead.length - 1 && rowEndArrow ? 'center' : 'inherit';
        return (
          <TableCell
            className={`${classes.tableCell} ${classes.tableHeadCell}`}
            style={{ cursor: 'pointer', textAlign }}
            key={key}
            onClick={() => handleSort(key)}
          >
            {prop}
          </TableCell>
        );
      })}
    </TableRow>
  );

  const TableBodyContent = () =>
    filteredList.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage).map((row, key) => (
      <Row
        key={key}
        {...{
          row,
          rowEndArrow,
          handleSelection,
          handleAdd,
          cell_line,
          firstRowOnClick,
          ExtraContent,
          selectedItem,
          handleAddPath,
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
        <Button aria-label='edit' justIcon round style={{ background: 'rgba(229,173,6)', color: 'white' }}>
          <Search />
        </Button>
      </div>
      <Table stickyHeader className={classes.table}>
        <TableHead className={classes[`${tableHeaderColor}TableHeader`]}>
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
