import createStyles from '@material-ui/core/styles/createStyles';

const customInputStyles = createStyles({
  disabled: {
    '&:before': {
      backgroundColor: 'transparent !important',
    },
  },
  underline: {
    '&:hover:not($disabled):before,&:before': {
      borderColor: `#D2D2D2 !important`,
      borderWidth: '1px !important',
    },
    '&:after': {
      borderColor: '#001233',
    },
  },
  underlineError: {
    '&:after': {
      borderColor: '#001233',
    },
  },
  underlineSuccess: {
    '&:after': {
      borderColor: '#113b5e',
    },
  },
  labelRoot: {
    color: `#AAAAAA !important`,
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '1.42857',
    letterSpacing: 'unset',
  },
  labelRootSuccess: {
    color: '#113b5e',
  },
  feedback: {
    position: 'absolute',
    top: '18px',
    right: '0',
    zIndex: 2,
    display: 'block',
    width: '24px',
    height: '24px',
    textAlign: 'center',
  },
  marginTop: {
    marginTop: '16px',
  },
  formControl: {
    paddingBottom: '10px',
    margin: '27px 0 0 0',
    position: 'relative',
    verticalAlign: 'unset',
  },
});

export default customInputStyles;
