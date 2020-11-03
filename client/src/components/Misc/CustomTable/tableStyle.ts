import createStyles from '@material-ui/core/styles/createStyles';

const tableStyle = createStyles({
  warningTableHeader: {
    color: '#FFC107',
  },
  primaryTableHeader: {
    color: '#001233',
  },
  successTableHeader: {
    color: '#2D4159',
  },
  infoTableHeader: {
    color: '#00acc1',
  },
  grayTableHeader: {
    color: '#999',
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
    '&, &$tableCell': {
      fontSize: '1em',
    },
  },
  tableCell: {
    fontWeight: 300,
    lineHeight: '1.5em',
    minHeight: '1.72857143',
    padding: 0,
    verticalAlign: 'middle',
    fontSize: '0.8125rem',
    maxWidth: '50rem',
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
});

export default tableStyle;
