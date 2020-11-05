import createStyles from '@material-ui/core/styles/createStyles';

const observationHeatMapStyles = createStyles({
  container: {
    height: '20em',
  },
  legendContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5px',
  },
  legendGradient: {
    height: 20,
    width: 300,
    background: 'linear-gradient(90deg, rgba(144,2,84,1) 0%, rgba(255,255,255,1) 50%, rgba(49,112,27,1) 100%)',
  },
  legendLeftText: { marginRight: '10px' },
  legendRightText: { marginLeft: '10px' },
});

export default observationHeatMapStyles;
