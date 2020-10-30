import createStyles from '@material-ui/core/styles/createStyles';

const kinaseListPhosphositesStyles = createStyles({
  warningTableHeader: {
    color: '#FFC107',
  },
  tableHeadCell: {
    color: 'inherit',
    '&, &$tableCell': {
      fontSize: '1em',
      fontWeight: 400,
    },
  },
  tableCell: {
    minHeight: '1.72857143',
    padding: '10px 0px',
    verticalAlign: 'middle',
    fontSize: '0.8125rem',
  },
  tableHeadRow: {
    height: '56px',
    color: 'inherit',
    display: 'table-row',
    outline: 'none',
    verticalAlign: 'middle',
  },
});

export default kinaseListPhosphositesStyles;
