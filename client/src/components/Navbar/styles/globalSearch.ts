import createStyles from '@material-ui/core/styles/createStyles';

const headerLinksStyle = createStyles({
  links: {
    width: '20px',
    height: '20px',
    zIndex: 4,
  },
  dropdown: {
    borderRadius: '3px',
    border: '0',
    boxShadow: `0 2px 5px 0 rgba(0,0,0, 0.26)`,
    top: '100%',
    zIndex: 1000,
    minWidth: '160px',
    padding: '5px 0',
    margin: '2px 0 0',
    fontSize: '14px',
    textAlign: 'left',
    listStyle: 'none',
    backgroundColor: '#fff',
    WebkitBackgroundClip: 'padding-box',
    backgroundClip: 'padding-box',
  },
  dropdownItem: {
    fontSize: '13px',
    padding: '10px 20px',
    margin: '0 5px',
    borderRadius: '2px',
    WebkitTransition: 'all 150ms linear',
    MozTransition: 'all 150ms linear',
    OTransition: 'all 150ms linear',
    MsTransition: 'all 150ms linear',
    transition: 'all 150ms linear',
    display: 'block',
    clear: 'both',
    fontWeight: 400,
    lineHeight: '1.42857143',
    color: '#333',
    whiteSpace: 'nowrap',
    height: 'unset',
    minHeight: 'unset',
    '&:hover': {
      backgroundColor: '#001233',
      color: '#fff',
      boxShadow: `0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px rgba(0,18,51,.4)`,
    },
  },
  search: {
    '& > div': {
      marginTop: '0',
      width: '20em',
    },
  },
  linkText: {
    zIndex: 4,
    fontSize: '14px',
    margin: '0px',
  },
  margin: {
    zIndex: 4,
    margin: '0',
  },
  searchIcon: {
    width: '17px',
    zIndex: 4,
  },
  notifications: {
    zIndex: 4,
    position: 'absolute',
    top: '2px',
    border: `1px solid white`,
    right: '4px',
    fontSize: '9px',
    background: '#001233',
    color: '#fff',
    minWidth: '16px',
    height: '16px',
    borderRadius: '10px',
    textAlign: 'center',
    lineHeight: '16px',
    verticalAlign: 'middle',
    display: 'block',
  },
  manager: {
    display: 'inline-block',
  },
  searchWrapper: {
    display: 'inline-block',
  },
});

export default headerLinksStyle;
