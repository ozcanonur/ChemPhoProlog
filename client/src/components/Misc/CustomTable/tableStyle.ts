import createStyles from '@material-ui/core/styles/createStyles';

const tableStyle = createStyles({
  primaryTableHeader: {
    color: '#001233',
  },
  table: {
    marginBottom: '0',
    width: '100%',
    maxWidth: '100%',
    backgroundColor: 'transparent',
    borderSpacing: '0',
    borderCollapse: 'collapse',
  },
  tableHeadCell: {
    color: 'inherit',
    fontWeight: 300,
    lineHeight: '1.5em',
    cursor: 'pointer',
    paddingRight: '0.5rem !important',
    '&, &$tableCell': {
      fontSize: '1.05em',
    },
  },
  tableCell: {
    fontWeight: 300,
    lineHeight: '1.5em',
    minHeight: '1.7',
    padding: 0,
    verticalAlign: 'middle',
    fontSize: '0.8125rem',
    maxWidth: '50rem',
    paddingRight: '0.5rem !important',
  },
  tableResponsive: {
    width: '100%',
    marginTop: '2px',
    overflowX: 'auto',
  },
  tableHeadRow: {
    height: '56px',
    color: 'inherit',
    display: 'table-row',
    outline: 'none',
    verticalAlign: 'middle',
  },
  tableBodyRow: {
    minHeight: '1.72857143',
    height: '48px',
    color: 'inherit',
    display: 'table-row',
    outline: 'none',
    verticalAlign: 'middle',
  },
  tableCellClickableContent: {
    cursor: 'pointer',
    color: '#0066CC',
    display: 'inline',
  },
  button: {
    background: 'rgba(229,173,6)',
    color: 'white',
  },
  helpButton: {
    background: 'rgba(229,173,6)',
    color: 'white',
    fontWeight: 300,
    fontSize: '1.2rem',
  },
  topBarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default tableStyle;
