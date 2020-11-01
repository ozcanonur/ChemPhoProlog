import createStyles from '@material-ui/core/styles/createStyles';

const inputsStyles = createStyles({
  button: {
    width: '200px',
    backgroundColor: 'rgba(229,173,6) !important',
    color: 'white',
    height: '50px',
    position: 'relative',
  },
  img: {
    marginTop: '-17px',
    marginBottom: '5px',
  },
  error: {
    position: 'absolute',
    bottom: '-20px',
    color: 'red',
  },
  switchContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default inputsStyles;
