import createStyles from '@material-ui/core/styles/createStyles';

const inputsStyles = createStyles({
  button: {
    width: '200px',
    backgroundColor: 'rgba(229,173,6) !important',
    color: 'white',
    height: '50px',
    position: 'relative',
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
  loading: {
    height: '5rem',
    width: '10rem',
  },
  inputsButton: {
    display: 'block',
  },
  formControl: {
    margin: '3px',
    minWidth: '15rem',
  },
  list: {
    maxHeight: '30rem',
  },
  inputLabel: {
    display: 'flex',
    alignItems: 'center',

    '& > svg': {
      width: '0.85em',
      height: '0.85em',
    },
  },
  labelText: {
    marginLeft: '0.5rem',
  },
});

export default inputsStyles;
