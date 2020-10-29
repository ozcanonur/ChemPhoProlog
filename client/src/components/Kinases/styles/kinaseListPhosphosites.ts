import createStyles from '@material-ui/core/styles/createStyles';

const kinaseListPhosphositesStyles = createStyles({
  warningTableHeader: {
    color: '#FFC107',
  },
  tableHeadCell: {
    color: 'inherit',
    '&, &$tableCell': {
      fontSize: '1em',
    },
  },
  tableCell: {
    minHeight: '1.72857143',
    padding: '12px 8px',
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
