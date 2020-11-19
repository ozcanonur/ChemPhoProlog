/* eslint-disable react/no-array-index-key */
/* eslint-disable no-restricted-globals */
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

interface HelperPopup {
  position: { row: number; column: number };
  component: JSX.Element;
}

interface Helper {
  helpers: HelperPopup[];
  helpersOpen: boolean;
  toggleHelpers: () => void;
}

interface Props {
  id: string;
  tableHead: string[];
  tableData: string[][];
  RowContentRight?: ({ row }: { row: string[] }) => JSX.Element;
  RowExpandableContentLeft?: ({ row }: { row: string[] }) => JSX.Element;
  RowExpandableContentLeftFilter?: string[];
  clickableCells?: {
    [key: string]: (name: string) => void;
  };
  searchIndex: number;
  selectedItem?: string;
  helpers?: Helper;
}

const CustomTable = (props: Props) => {
  const classes = useStyles();

  const {
    id,
    tableHead,
    tableData,
    RowContentRight,
    RowExpandableContentLeft,
    RowExpandableContentLeftFilter,
    clickableCells,
    searchIndex,
    selectedItem,
    helpers,
  } = props;

  const [filteredList, setFilteredList] = useState<string[][]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useLocalStorage(`${id}_currentPage`, 0);

  useEffect(() => {
    setFilteredList(tableData);
  }, [tableData]);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // On page change
  const handlePageChange = (_event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
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
  const [sortedAsc, setSortedAsc] = useState<{ [key: string]: boolean }>(createSortState());

  const handleSort = (key: number) => {
    // eslint-disable-next-line no-param-reassign
    if (RowExpandableContentLeft) key -= 1;

    // Check which order we need to sort
    const sortingOrder = sortedAsc[key] ? 1 : -1;
    let sortedList = [];
    sortedList = filteredList.sort((x, y) => {
      // Check if the column values are number or string
      // @ts-ignore
      const first = isNaN(x[key]) ? x[key] : parseFloat(x[key]);
      // @ts-ignore
      const second = isNaN(y[key]) ? y[key] : parseFloat(y[key]);
      if (first < second) return sortingOrder;
      if (first > second) return -1 * sortingOrder;
      return 0;
    });

    setFilteredList([...sortedList]);
    setSortedAsc({ ...sortedAsc, [key]: !sortedAsc[key] });
  };

  /*-------------------------*/

  /*-------------------------*/
  // Filter the values by the search term and set the state
  const filterByTermAndSetTableData = (value: string) => {
    const filtered = tableData.filter((row) => row[searchIndex].toString().toLowerCase().indexOf(value.toLowerCase()) === 0);
    setCurrentPage(0);
    setFilteredList(filtered);
  };

  const slicedTableData = filteredList.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage);

  /*-------------------------*/

  return (
    <div className={classes.tableResponsive}>
      <div>
        <Button className={classes.helpButton} onClick={helpers?.toggleHelpers} aria-label='edit' justIcon round>
          ?
        </Button>
      </div>
      <div style={{ textAlign: 'right' }}>
        <CustomInput
          formControlProps={{}}
          inputProps={{
            placeholder: 'Search',
            inputProps: {
              onChange: (event: React.ChangeEvent<HTMLInputElement>) => filterByTermAndSetTableData(event.target.value),
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
              RowExpandableContentLeftFilter={RowExpandableContentLeftFilter}
              clickableCells={clickableCells}
              selectedItem={selectedItem}
              helper={helpers && helpers.helpersOpen ? helpers.helpers.find((helper) => helper.position.row === key) : undefined}
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
