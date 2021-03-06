import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import makeStyles from '@material-ui/core/styles/makeStyles';
import styles from 'components/Misc/CustomTable/tableStyle';

const useStyles = makeStyles(styles);

interface Props {
  content: string[];
  handleSort: (x: number) => void;
}

const TableHead = ({ content, handleSort }: Props) => {
  const classes = useStyles();

  return (
    <TableRow className={classes.tableHeadRow}>
      {content.map((e, key) => (
        <TableCell
          className={`${classes.tableCell} ${classes.tableHeadCell}`}
          key={e}
          onClick={() => handleSort(key)}
          style={{ textAlign: key === content.length - 1 ? 'center' : 'inherit' }}
        >
          {e}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default TableHead;
