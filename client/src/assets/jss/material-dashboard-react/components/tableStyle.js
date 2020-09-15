import {
  warningColor,
  primaryColor,
  successColor,
  infoColor,
  grayColor,
  defaultFont,
} from 'assets/jss/dashboardStyle';

const tableStyle = (theme) => ({
  warningTableHeader: {
    color: warningColor[0],
  },
  primaryTableHeader: {
    color: primaryColor[0],
  },
  successTableHeader: {
    color: successColor[0],
  },
  infoTableHeader: {
    color: infoColor[0],
  },
  grayTableHeader: {
    color: grayColor[0],
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
    ...defaultFont,
    '&, &$tableCell': {
      fontSize: '1em',
    },
  },
  tableCell: {
    ...defaultFont,
    minHeight: '1.72857143',
    padding: '12px 8px',
    verticalAlign: 'middle',
    fontSize: '0.8125rem',
    // minWidth: '5em',
  },
  tableResponsive: {
    width: '100%',
    marginTop: theme.spacing(3),
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
});

export default tableStyle;
