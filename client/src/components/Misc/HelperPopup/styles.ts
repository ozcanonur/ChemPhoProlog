import createStyles from '@material-ui/core/styles/createStyles';

const helperPopupStyles = createStyles({
  container: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    top: '10px',
  },
  helperTextContainer: {
    backgroundColor: 'rgba(54, 57, 63, 0.8)',
    boxShadow: '0 1rem 1rem 0 rgba(0, 0, 0, 0.2)',
    color: 'white',
    fontSize: '0.9rem',
    padding: '0.8rem 1.4rem',
    zIndex: 9999,
    width: 'max-content',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    // borderRadius: '0.5rem',
    // borderTopLeftRadius: 0,
  },
  helperTextContainerRight: {
    flexDirection: 'row-reverse',
  },
  helperTextContainerDown: {
    flexDirection: 'column-reverse',
  },
  helperTextContainerUp: {
    flexDirection: 'column',
  },
  arrow: {
    width: 0,
    height: 0,
  },
  arrowLeft: {
    borderTop: '10px solid transparent',
    borderBottom: '10px solid transparent',
    borderRight: '10px solid rgba(54, 57, 63, 0.8)',
  },
  arrowRight: {
    borderTop: '10px solid transparent',
    borderBottom: '10px solid transparent',
    borderLeft: '10px solid rgba(54, 57, 63, 0.8)',
  },
  arrowDown: {
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderTop: '10px solid rgba(54, 57, 63, 0.8)',
  },
  arrowUp: {
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderBottom: '10px solid rgba(54, 57, 63, 0.8)',
  },
});

export default helperPopupStyles;
