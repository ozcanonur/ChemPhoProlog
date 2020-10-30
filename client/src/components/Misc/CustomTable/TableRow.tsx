/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from 'react';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableRow from '@material-ui/core/TableRow';
import makeStyles from '@material-ui/core/styles/makeStyles';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';

import styles from 'components/Misc/CustomTable/tableStyle';

const useStyles = makeStyles(styles);

interface Props {
  row: string[];
  RowContentRight?: ({ row }: { row: string[] }) => JSX.Element;
  RowExpandableContentLeft?: ({ row }: { row: string[] }) => JSX.Element;
  clickableCells?: {
    [key: string]: (name: string) => void;
  };
  selectedItem?: string;
}

const Row = (props: Props): JSX.Element => {
  const {
    row,
    RowContentRight,
    RowExpandableContentLeft,
    clickableCells,
    selectedItem,
  } = props;

  const isExpandable = Boolean(RowExpandableContentLeft);
  const classes = useStyles(isExpandable);

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
            {RowExpandableContentLeft && key === 0 ? (
              <TableCell className={classes.tableCell}>
                <IconButton
                  aria-label='expand row'
                  size='small'
                  onClick={handleExpandButton}
                >
                  {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </IconButton>
              </TableCell>
            ) : null}
            <TableCell className={classes.tableCell} key={key}>
              {clickableCells && clickableCells[key] ? (
                <div
                  onClick={() => clickableCells[key](prop)}
                  className={classes.tableCellClickableContent}
                >
                  {prop}
                </div>
              ) : (
                prop
              )}
            </TableCell>
            {RowContentRight && key === row.length - 1 ? (
              <TableCell style={{ textAlign: 'center' }}>
                <RowContentRight row={row} />
              </TableCell>
            ) : null}
          </React.Fragment>
        ))}
      </TableRow>
      {RowExpandableContentLeft ? (
        <TableRow>
          <TableCell colSpan={12}>
            <Collapse in={open} timeout='auto' mountOnEnter unmountOnExit>
              <Box margin={1}>
                <RowExpandableContentLeft row={row} />
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      ) : null}
    </>
  );
};

export default Row;
