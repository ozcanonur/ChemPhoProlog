/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
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

interface Helper {
  position: { row: number; column: number };
  component: JSX.Element;
}

interface Props {
  row: string[];
  RowContentRight?: ({ row }: { row: string[] }) => JSX.Element;
  RowExpandableContentLeft?: ({ row }: { row: string[] }) => JSX.Element;
  RowExpandableContentLeftFilter?: string[];
  clickableCells?: {
    [key: string]: (name: string) => void;
  };
  selectedItem?: string;
  helper?: Helper;
}

const Row = (props: Props) => {
  const {
    row,
    RowContentRight,
    RowExpandableContentLeft,
    RowExpandableContentLeftFilter,
    clickableCells,
    selectedItem,
    helper,
  } = props;

  console.log(helper);

  const isExpandable = Boolean(RowExpandableContentLeft);
  const classes = useStyles(isExpandable);

  const [expandableOpen, setExpandableOpen] = useState(false);

  // To close the expandable row on pagination change (next page etc.)
  useEffect(() => {
    setExpandableOpen(false);
  }, [row]);

  const handleExpandButton = () => {
    setExpandableOpen(!expandableOpen);
  };

  console.log(row);
  return (
    <>
      <TableRow
        className={classes.tableBodyRow}
        style={{
          backgroundColor: row[0] === selectedItem ? 'rgba(229,173,6, 0.1)' : '',
        }}
      >
        {row.map((prop, key) => (
          <React.Fragment key={key}>
            {RowExpandableContentLeft && key === 0 ? (
              <TableCell className={classes.tableCell}>
                {!RowExpandableContentLeftFilter || RowExpandableContentLeftFilter?.includes(prop) ? (
                  <IconButton aria-label='expand row' size='small' onClick={handleExpandButton}>
                    {expandableOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                  </IconButton>
                ) : null}
                {helper && helper.position.column === 0 ? helper.component : null}
              </TableCell>
            ) : null}
            <TableCell className={classes.tableCell} key={key}>
              <>
                {clickableCells && clickableCells[key] ? (
                  <div onClick={() => clickableCells[key](prop)} className={classes.tableCellClickableContent}>
                    {prop}
                  </div>
                ) : (
                  prop
                )}
                {helper && helper.position.column === key && helper.position.column !== 0 && helper.position.column !== 4
                  ? helper.component
                  : null}
              </>
            </TableCell>
            {RowContentRight && key === row.length - 1 ? (
              <TableCell style={{ textAlign: 'center' }}>
                <RowContentRight row={row} />
                {helper && helper.position.column === 4 ? helper.component : null}
              </TableCell>
            ) : null}
          </React.Fragment>
        ))}
      </TableRow>
      {RowExpandableContentLeft ? (
        <TableRow>
          <TableCell colSpan={12}>
            <Collapse in={expandableOpen} timeout='auto' mountOnEnter>
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
