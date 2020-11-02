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

import { useLocalStorage } from 'utils/customHooks';
import Button from 'components/Misc/CustomButton/Button';
import CustomInput from 'components/Misc/CustomInput/CustomInput';
import styles from 'components/Misc/CustomTable/tableStyle';
import Row from './TableRow';
import Head from './TableHead';

const useStyles = makeStyles(styles);

interface Props {
  id: string;
  tableHead: string[];
  tableData: string[][];
  RowContentRight?: ({ row }: { row: string[] }) => JSX.Element;
  RowExpandableContentLeft?: ({ row }: { row: string[] }) => JSX.Element;
  clickableCells?: {
    [key: string]: (name: string) => void;
  };
  searchIndex: number;
  selectedItem?: string;
}

const CustomTable = (props: Props) => {
  const classes = useStyles();

  const {
    id,
    tableHead,
    tableData,
    RowContentRight,
    RowExpandableContentLeft,
    clickableCells,
    searchIndex,
    selectedItem,
  } = props;

  const [filteredList, setFilteredList] = useState<string[][]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useLocalStorage(`${id}_currentPage`, 0);

  useEffect(() => {
    setFilteredList(tableData);
  }, [tableData]);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // On page change
  const handlePageChange = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setCurrentPage(page);
  };

  /*-------------------------*/
  // Sorting, WOOP, sort state
  // Currently displayed values, filtered by the search field
  const createSortState = () => {
    let { length } = tableHead;
    if (RowExpandableContentLeft) length -= 1;

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
    if (RowExpandableContentLeft) key -= 1;

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
    const filtered = tableData.filter(
      (row) =>
        row[searchIndex]
          .toString()
          .toLowerCase()
          .indexOf(value.toLowerCase()) === 0
    );
    setCurrentPage(0);
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
              onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                filterByTermAndSetTableData(event.target.value),
            },
          }}
        />
        <Button justIcon round className={classes.button}>
          <Search />
        </Button>
      </div>
      <Table className={classes.table}>
        <TableHead className={classes.primaryTableHeader}>
          <Head content={tableHead} handleSort={handleSort} />
        </TableHead>
        <TableBody>
          {slicedTableData.map((row, key) => (
            <Row
              key={key}
              row={row}
              RowContentRight={RowContentRight}
              RowExpandableContentLeft={RowExpandableContentLeft}
              clickableCells={clickableCells}
              selectedItem={selectedItem}
            />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={filteredList.length}
        rowsPerPage={rowsPerPage}
        page={filteredList.length > 0 ? currentPage : 0}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default CustomTable;
