import createStyles from '@material-ui/core/styles/createStyles';

const headerStyle = createStyles({
  appBar: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    borderBottom: '0',
    marginBottom: '0',
    position: 'absolute',
    width: '100%',
    paddingTop: '10px',
    zIndex: 1030,
    color: '#555555',
    border: '0',
    borderRadius: '3px',
    padding: '10px 0',
    transition: 'all 150ms ease 0s',
    minHeight: '50px',
    display: 'block',
  },
  container: {
    paddingRight: '15px',
    paddingLeft: '15px',
    marginRight: 'auto',
    marginLeft: 'auto',
    minHeight: '50px',
  },
  flex: {
    flex: 1,
  },
  title: {
    fontWeight: 300,
    letterSpacing: 'unset',
    lineHeight: '30px',
    fontSize: '18px',
    borderRadius: '3px',
    textTransform: 'none',
    color: 'inherit',
    margin: '0',
    '&:hover,&:focus': {
      background: 'transparent',
    },
  },
  appResponsive: {
    top: '8px',
  },
  primary: {
    backgroundColor: '#113b5e',
    color: '#fff',
    border: '0',
    borderRadius: '3px',
    boxShadow: `0 10px 20px -12px rgba(0,0,0, 0.42), 0 3px 20px 0px rgba(0,0,0, 0.12), 0 8px 10px -5px rgba(0,0,0, 0.2)`,
    padding: '10px 0',
    transition: 'all 150ms ease 0s',
  },
  info: {
    backgroundColor: '#00acc1',
    color: '#fff',
    border: '0',
    borderRadius: '3px',
    boxShadow: `0 10px 20px -12px rgba(0,0,0, 0.42), 0 3px 20px 0px rgba(0,0,0, 0.12), 0 8px 10px -5px rgba(0,0,0, 0.2)`,
    padding: '10px 0',
    transition: 'all 150ms ease 0s',
  },
  success: {
    backgroundColor: '#113b5e',
    color: '#fff',
    border: '0',
    borderRadius: '3px',
    boxShadow: `0 10px 20px -12px rgba(0,0,0, 0.42), 0 3px 20px 0px rgba(0,0,0, 0.12), 0 8px 10px -5px rgba(0,0,0, 0.2)`,
    padding: '10px 0',
    transition: 'all 150ms ease 0s',
  },
  warning: {
    backgroundColor: '#FFC107',
    color: '#fff',
    border: '0',
    borderRadius: '3px',
    boxShadow: `0 10px 20px -12px rgba(0,0,0, 0.42), 0 3px 20px 0px rgba(0,0,0, 0.12), 0 8px 10px -5px rgba(0,0,0, 0.2)`,
    padding: '10px 0',
    transition: 'all 150ms ease 0s',
  },
  navbarGridContainer: {
    width: '100%',
  },
});

export default headerStyle;
