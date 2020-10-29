import React from 'react';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell/TableCell';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Button from 'components/Misc/CustomButton/Button';
import styles from 'components/Misc/CustomTable/tableStyle';

const useStyles = makeStyles(styles);

export const ExpandButton = ({
  open,
  handleExpandButton,
}: {
  open: boolean;
  handleExpandButton: () => void;
}): JSX.Element => {
  const classes = useStyles();

  return (
    <TableCell className={classes.tableCell}>
      <IconButton
        aria-label='expand row'
        size='small'
        onClick={handleExpandButton}
      >
        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
      </IconButton>
    </TableCell>
  );
};

export const SelectionButton = ({
  row,
  handleSelection,
}: {
  row: any;
  handleSelection: any;
}): JSX.Element => (
  <IconButton
    aria-label='expand row'
    size='small'
    onClick={() => handleSelection(row[0])}
  >
    <KeyboardArrowRight />
  </IconButton>
);

export const AddToRouteButton = ({
  row,
  handleAdd,
}: {
  row: any;
  handleAdd: any;
}): JSX.Element => (
  <IconButton
    aria-label='expand row'
    size='small'
    onClick={() => handleAdd(row[0])}
  >
    <AddCircleOutline />
  </IconButton>
);

export const AddToPathInspectButton = ({
  row,
  handlePathAdd,
}: {
  row: any;
  handlePathAdd: any;
}): JSX.Element => (
  <Button
    onClick={() => handlePathAdd(row)}
    size='sm'
    style={{ backgroundColor: 'rgba(45, 65, 89, 0.7)' }}
  >
    Add to inspection
  </Button>
);
