import createStyles from '@material-ui/core/styles/createStyles';

const headerLinksStyle = createStyles({
  links: {
    width: '20px',
    height: '20px',
    zIndex: 4,
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
  searchWrapper: {
    display: 'inline-block',
    marginTop: '20px',
  },
  button: {
    background: 'rgba(229,173,6)',
    color: 'white',
  },
  fixedSizeList: {
    backgroundColor: 'white',
    color: 'black',
  },
});

export default headerLinksStyle;
