/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableRow from '@material-ui/core/TableRow';
import makeStyles from '@material-ui/core/styles/makeStyles';

import styles from 'components/Misc/CustomTable/tableStyle';
import {
  ExpandButton,
  SelectionButton,
  AddToRouteButton,
  AddToPathInspectButton,
} from './TableRowButtons';

const useStyles = makeStyles(styles);

interface Props {
  row: string[];
  rowEndArrow?: boolean;
  selectedItem?: string;
  cell_line?: string;
  firstRowOnClick?: boolean;
  ExtraContent?: any;
  handleSelection?: any;
  handleAdd?: any;
  handleAddPath?: any;
}

const Row = (props: Props): JSX.Element => {
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

  return (
    <>
      <TableRow
        className={classes.tableBodyRow}
        style={{
          backgroundColor:
            row[0] === selectedItem ? 'rgba(229,173,6, 0.1)' : 'inherit',
        }}
      >
        {row.map((prop, key) => (
          <React.Fragment key={key}>
            {ExtraContent && key === 0 ? (
              <ExpandButton
                open={open}
                handleExpandButton={handleExpandButton}
              />
            ) : null}
            <TableCell className={classes.tableCell} key={key}>
              {firstRowOnClick ? (
                <Link
                  style={{
                    color: key === 0 ? '#0066CC' : 'inherit',
                    textDecoration: 'none',
                  }}
                  to={`/${row[0]}/description`}
                  onClick={() => {
                    handleAdd(row[0]);
                  }}
                >
                  {prop}
                </Link>
              ) : (
                prop
              )}
            </TableCell>
            {rowEndArrow && key === row.length - 1 ? (
              <TableCell style={{ textAlign: 'center' }}>
                {handleAdd ? (
                  <AddToRouteButton row={row} handleAdd={handleAdd} />
                ) : null}
                {handleSelection ? (
                  <SelectionButton
                    row={row}
                    handleSelection={handleSelection}
                  />
                ) : null}
                {handleAddPath ? (
                  <AddToPathInspectButton
                    row={row}
                    handlePathAdd={handleAddPath}
                  />
                ) : null}
              </TableCell>
            ) : null}
          </React.Fragment>
        ))}
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

export default Row;
