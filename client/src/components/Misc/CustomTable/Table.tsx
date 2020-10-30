/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect } from 'react';
import range from 'lodash/range';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';

import TableBody from '@material-ui/core/TableBody';
import Search from '@material-ui/icons/Search';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TablePagination from '@material-ui/core/TablePagination';

import Button from 'components/Misc/CustomButton/Button';
import CustomInput from 'components/Misc/CustomInput/CustomInput';
import styles from 'components/Misc/CustomTable/tableStyle';
import Row from './TableRow';
import Head from './TableHead';

const useStyles = makeStyles(styles);

interface Props {
  tableHead: string[];
  tableHeaderColor: string;
  tableData: string[][];
  currentPage: number;
  firstRowOnClick?: boolean;
  ExtraContent?: any;
  cell_line?: string;
  selectedItem?: string;
  rowEndArrow?: boolean;
  rowsPerPage: number;
  handlePageChange: any;
  handleAdd?: any;
  handleSelection?: any;
  handleAddPath?: any;
}

const CustomTable = (props: Props): JSX.Element => {
  const classes = useStyles();

  const {
    tableHead,
    tableHeaderColor,
    tableData,
    currentPage,
    rowEndArrow,
    firstRowOnClick,
    ExtraContent,
    cell_line,
    selectedItem,
    handlePageChange,
    handleAdd,
    handleSelection,
    handleAddPath,
  } = props;

  const [filteredList, setFilteredList] = useState<string[][]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(props.rowsPerPage);

  useEffect(() => {
    setFilteredList(tableData);
  }, [tableData]);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  /*-------------------------*/
  // Sorting
  // Currently displayed values, filtered by the search field
  const createSortState = () => {
    let { length } = tableHead;
    if (ExtraContent) length -= 1;
    if (rowEndArrow) length -= 1;

    const obj = {};
    range(0, length).forEach((x) => {
      // @ts-ignore
      if (x === 0) obj[x] = true;
      // @ts-ignore
      else obj[x] = false;
    });

    return obj;
  };

  // Sort state
  const [sortedAsc, setSortedAsc] = useState<{ [key: string]: boolean }>(
    createSortState()
  );

  const handleSort = (key: number) => {
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

  /*-------------------------*/

  /*-------------------------*/
  // Filtering
  // Filter the values by the search term and set the state
  const filterByTermAndSetTableData = (value: string) => {
    const key = handleAddPath ? 1 : 0;
    const filtered = tableData.filter(
      (row) =>
        row[key].toString().toLowerCase().indexOf(value.toLowerCase()) === 0
    );
    handlePageChange(null, 0);
    setFilteredList(filtered);
  };

  const slicedTableData = filteredList.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  /*-------------------------*/

  return (
    <div className={classes.tableResponsive}>
      <div style={{ textAlign: 'right' }}>
        <CustomInput
          formControlProps={{}}
          inputProps={{
            placeholder: 'Search',
            inputProps: {
              'aria-label': 'Search',
              onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                filterByTermAndSetTableData(event.target.value),
            },
          }}
        />
        <Button
          aria-label='edit'
          justIcon
          round
          style={{ background: 'rgba(229,173,6)', color: 'white' }}
        >
          <Search />
        </Button>
      </div>
      <Table className={classes.table}>
        {/* @ts-ignore */}
        <TableHead className={classes[`${tableHeaderColor}TableHeader`]}>
          <Head
            content={tableHead}
            rowEndArrow={rowEndArrow}
            handleSort={handleSort}
          />
        </TableHead>
        <TableBody>
          {slicedTableData.map((row, key) => (
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
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={filteredList.length}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default CustomTable;
