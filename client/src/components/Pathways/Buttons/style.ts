import createStyles from '@material-ui/core/styles/createStyles';

const buttonsStyles = createStyles({
  container: {
    padding: '1em',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  button: {
    width: '100px',
    backgroundColor: 'rgba(45,65,89, 0.7)',
  },
  legendContainer: {
    position: 'absolute',
    top: 10,
    right: 130,
    pointerEvents: 'none',
    padding: '10px',
  },
  text: {
    marginLeft: '5px',
    fontSize: '0.9rem',
  },
  area: {
    width: '20px',
    height: '20px',
    opacity: 0.4,
  },
  border: {
    borderWidth: '2',
    display: 'inline-block',
    boxSizing: 'border-box',
    height: '20px',
    width: '20px',
    borderRadius: '50%',
    borderStyle: 'dotted',
  },
  line: {
    backgroundColor: 'white',
    color: 'white',
    width: '18px',
  },
  node: {
    height: '20px',
    width: '20px',
    borderRadius: '50%',
    display: 'inline-block',
  },
});

export default buttonsStyles;
