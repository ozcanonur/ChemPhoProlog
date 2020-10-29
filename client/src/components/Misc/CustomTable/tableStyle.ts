const tableStyle = {
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
    padding: '12px 8px',
    verticalAlign: 'middle',
    fontSize: '0.8125rem',
    // minWidth: '5em',
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
};

export default tableStyle;
