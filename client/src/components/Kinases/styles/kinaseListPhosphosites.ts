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
  menu: {
    maxHeight: '30rem',
  },
  svg: {
    width: '1.4rem !important',
    height: '1.4rem !important',
    margin: '0 !important',
  },
  button: {
    backgroundColor: 'rgba(45, 65, 89, 0.8)',
    boxShadow: '0,3px,5px,0,rgba(0,0,0,0.2)',
    padding: 0,
    margin: 0,
    marginLeft: '0.5rem',
  },
  phosphositeCell: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default kinaseListPhosphositesStyles;
