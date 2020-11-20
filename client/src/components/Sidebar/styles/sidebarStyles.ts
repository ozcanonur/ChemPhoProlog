import createStyles from '@material-ui/core/styles/createStyles';
import image from 'assets/img/dna.jpg';

const sidebarStyle = createStyles({
  drawerPaper: {
    border: 'none',
    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',
    zIndex: 1,
    boxShadow: '0 2rem 2rem rgba(0,0,0,0.2)',
    height: '100%',
    width: '240px',
  },
  routesContainer: {
    position: 'relative',
    height: 'calc(100vh - 75px)',
    overflowY: 'auto',
    overflowX: 'hidden',
    width: '240px',
    zIndex: 4,
    '&::-webkit-scrollbar-track': {
      background: 'black !important',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#999',
      border: '3px solid #040102',
    },
  },
  list: {
    marginTop: '20px',
    paddingLeft: '0',
    paddingTop: '0',
    paddingBottom: '0',
    marginBottom: '0',
    listStyle: 'none',
    position: 'unset',
  },
  routeContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  extraRoutesContainer: {
    marginTop: '1em',
    borderTop: '1px solid white',
  },
  background: {
    backgroundImage: `url(${image})`,
    position: 'absolute',
    zIndex: 1,
    height: '100%',
    width: '100%',
    display: 'block',
    top: '0',
    left: '0',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    '&:after': {
      position: 'absolute',
      zIndex: 3,
      width: '100%',
      height: '100%',
      content: '""',
      display: 'block',
      background: '#000',
      opacity: '.85',
    },
  },
  // Standard + Extra routes
  item: {
    position: 'relative',
    display: 'block',
    textDecoration: 'none',
    '&:hover,&:focus,&:visited,&': {
      color: '#fff',
    },
  },
  itemLink: {
    width: 'auto',
    transition: 'all 0.2s',
    margin: '10px 15px 0',
    borderRadius: '3px',
    position: 'relative',
    display: 'block',
    padding: '10px 15px',
    backgroundColor: 'transparent',

    '&:hover': {
      backgroundColor: 'rgba(242, 189, 31,0.25)',
    },
  },
  orange: {
    backgroundColor: '#e5ad06',
    '&:hover,&:focus': {
      backgroundColor: '#e5ad06',
    },
  },
  itemIcon: {
    width: '24px',
    height: '30px',
    fontSize: '24px',
    lineHeight: '30px',
    float: 'left',
    marginRight: '15px',
    textAlign: 'center',
    verticalAlign: 'middle',
    color: `rgba(255, 255, 255, 0.8)`,
  },
  itemText: {
    margin: '0',
    lineHeight: '30px',
    fontSize: '14px',
    color: '#fff',
  },
  titleListItem: {
    marginTop: '1em',
    textAlign: 'center',
    borderRadius: '4px',
    border: '1px solid white',
    alignSelf: 'center',
    maxWidth: '90%',
  },
  removeIcon: {
    color: 'white',
    cursor: 'pointer',
  },
  titleItemText: {
    margin: '0',
    lineHeight: '30px',
    fontSize: '14px',
    color: '#fff',
    textAlign: 'left',
    marginLeft: '1em',
    cursor: 'pointer',
  },
  expandIcon: {
    color: 'white',
    cursor: 'pointer',
  },
  logo: {
    list: {
      marginTop: '20px',
      paddingLeft: '0',
      paddingTop: '0',
      paddingBottom: '0',
      marginBottom: '0',
      listStyle: 'none',
      position: 'unset',
    },
    position: 'relative',
    padding: '15px 15px',
    zIndex: 4,
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: '0',
      height: '1px',
      right: '15px',
      width: 'calc(100% - 30px)',
      backgroundColor: `rgba(180, 180, 180, 0.3)`,
    },
  },
  logoLink: {
    textTransform: 'uppercase',
    padding: '5px 0',
    display: 'block',
    fontSize: '1rem',
    textAlign: 'left',
    fontWeight: 400,
    lineHeight: '30px',
    textDecoration: 'none',
    backgroundColor: 'transparent',
    '&,&:hover': {
      color: '#fff',
    },
  },
  logoImage: {
    width: '30px',
    display: 'inline-block',
    maxHeight: '30px',
    marginLeft: '10px',
    marginRight: '15px',
  },
  img: {
    width: '35px',
    top: '22px',
    position: 'absolute',
    verticalAlign: 'middle',
    border: '0',
  },
});

export default sidebarStyle;
