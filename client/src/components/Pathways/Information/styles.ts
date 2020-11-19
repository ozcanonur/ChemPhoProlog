import createStyles from '@material-ui/core/styles/createStyles';

const informationStyles = createStyles({
  waffleContainer: {
    height: '9rem',
    position: 'relative',

    '& div > div > svg': {
      maxWidth: '100% !important',
    },
  },
  legendContainer: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '0.8rem',
    flexWrap: 'wrap',
    width: '100%',

    '& > div:not(:last-child)': {
      marginRight: '1rem',
    },
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',

    '& div': {
      display: 'inline-block',
      letterSpacing: '0.3px !important',
    },
  },
  legendIcon: {
    height: '10px',
    width: '10px',
    display: 'inline-block',
    marginRight: '0.4rem',
  },
  addInspectionButton: {
    backgroundColor: 'rgba(17, 59, 94, 0.7)',
  },
});

export default informationStyles;
