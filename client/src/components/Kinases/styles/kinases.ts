import createStyles from '@material-ui/core/styles/createStyles';

const kinasesStyles = createStyles({
  container: {
    padding: '2rem',
    overflow: 'inherit',
    margin: '0 0 !important',
  },
  leftHelperContainer: {
    position: 'absolute',
    top: '50%',
    left: '6.7%',
  },
  rightHelperContainer: {
    position: 'absolute',
    top: '50%',
    right: '1%',
  },
  helperTextContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(54, 57, 63, 0.8)',
    boxShadow: '0 1rem 1rem 0 rgba(0, 0, 0, 0.2)',
    color: 'white',
    fontSize: '0.9rem',
    padding: '0.8rem 1.4rem',
    zIndex: 9999,
    width: 'max-content',
    top: '60%',
    left: '56%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: '0.5rem',
  },
  helperIcon: {
    color: '#36393f',
    fontSize: '2rem',
    transform: 'rotate(45deg)',
    opacity: 0.8,
  },
  helperButton: {
    marginTop: '1rem',
    backgroundColor: 'rgba(255, 190, 0, 0.75)',
    padding: '0.4rem 1.4rem',
    display: 'inline-block',
    cursor: 'pointer',
    borderRadius: '4px',
    boxShadow: '0 5px 1rem 0 rgba(0, 0, 0, 0.2)',
    transition: 'all .2s ease-out',

    '&:hover': {
      backgroundColor: '#ffbe00',
    },
  },
});

export default kinasesStyles;
