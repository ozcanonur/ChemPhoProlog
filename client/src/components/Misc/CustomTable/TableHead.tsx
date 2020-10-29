import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import makeStyles from '@material-ui/core/styles/makeStyles';
import styles from 'components/Misc/CustomTable/tableStyle';

const useStyles = makeStyles(styles);

interface Props {
  content: string[];
  rowEndArrow?: boolean;
  handleSort: (x: number) => void;
}

const TableHead = ({
  content,
  rowEndArrow,
  handleSort,
}: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <TableRow className={classes.tableHeadRow}>
      {content.map((e, key) => {
        const textAlign =
          key === content.length - 1 && rowEndArrow ? 'center' : 'inherit';
        return (
          <TableCell
            className={`${classes.tableCell} ${classes.tableHeadCell}`}
            style={{ cursor: 'pointer', textAlign }}
            key={e}
            onClick={() => handleSort(key)}
          >
            {e}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default TableHead;
