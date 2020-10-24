import {
  warningCardHeader,
  successCardHeader,
  infoCardHeader,
  primaryCardHeader,
  grayColor,
} from 'assets/jss/dashboardStyle';

const cardIconStyle = {
  cardIcon: {
    '&$warningCardHeader,&$successCardHeader,&$infoCardHeader,&$primaryCardHeader': {
      borderRadius: '3px',
      backgroundColor: grayColor[0],
      padding: '15px',
      marginTop: '-20px',
      marginRight: '15px',
      float: 'left',
    },
  },
  warningCardHeader,
  successCardHeader,
  infoCardHeader,
  primaryCardHeader,
};

export default cardIconStyle;
