import createStyles from '@material-ui/core/styles/createStyles';

const cardStyles = createStyles({
  card: {
    border: '0',
    marginBottom: '15px',
    marginTop: '30px',
    borderRadius: '6px',
    color: `rgba(0,0,0, 0.87)`,
    background: '#fff',
    width: '100%',
    boxShadow: `0 1px 4px 0 rgba(0,0,0, 0.14)`,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '0',
    wordWrap: 'break-word',
    fontSize: '.875rem',
  },
  cardBody: {
    padding: '0.9375rem 20px',
    flex: '1 1 auto',
    WebkitBoxFlex: 1,
    position: 'relative',
  },
  cardFooter: {
    padding: '0',
    paddingTop: '10px',
    margin: '0 15px 10px',
    borderRadius: '0',
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    backgroundColor: 'transparent',
    border: '0',
  },
  cardFooterStats: {
    borderTop: '1px solid #e7e7e7',
    marginTop: '20px',
    '& svg': {
      position: 'relative',
      top: '4px',
      marginRight: '3px',
      marginLeft: '3px',
      width: '16px',
      height: '16px',
    },
    '& .fab,& .fas,& .far,& .fal,& .material-icons': {
      fontSize: '16px',
      position: 'relative',
      top: '4px',
      marginRight: '3px',
      marginLeft: '3px',
    },
  },
  cardTitleWhite: {
    color: '#fff',
    marginTop: '0px',
    minHeight: 'auto',
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
  cardCategoryWhite: {
    color: `rgba(255,255,255,.62)`,
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardHeader: {
    padding: '0.75rem 1.25rem',
    marginBottom: '0',
    borderBottom: 'none',
    background: 'transparent',
    zIndex: 3,
    '&$cardHeaderPlain,&$cardHeaderIcon,&$cardHeaderStats,&$warningCardHeader,&$successCardHeader,&$infoCardHeader,&$primaryCardHeader': {
      margin: '0 15px',
      padding: '0',
      position: 'relative',
      color: '#fff',
    },
    '&:first-child': {
      borderRadius: 'calc(.25rem - 1px) calc(.25rem - 1px) 0 0',
    },
    '&$warningCardHeader,&$successCardHeader,&$infoCardHeader,&$primaryCardHeader': {
      '&:not($cardHeaderIcon)': {
        borderRadius: '3px',
        marginTop: '-20px',
        padding: '15px',
      },
    },
    '&$cardHeaderStats svg': {
      fontSize: '36px',
      lineHeight: '56px',
      textAlign: 'center',
      width: '36px',
      height: '36px',
      margin: '10px 10px 4px',
    },
    '&$cardHeaderStats i,&$cardHeaderStats .material-icons': {
      fontSize: '36px',
      lineHeight: '56px',
      width: '56px',
      height: '56px',
      textAlign: 'center',
      overflow: 'unset',
      marginBottom: '1px',
    },
    '&$cardHeaderStats$cardHeaderIcon': {
      textAlign: 'right',
    },
  },
  cardHeaderPlain: {
    marginLeft: '0px !important',
    marginRight: '0px !important',
  },
  cardHeaderStats: {
    '& $cardHeaderIcon': {
      textAlign: 'right',
    },
    '& h1,& h2,& h3,& h4,& h5,& h6': {
      margin: '0 !important',
    },
  },
  cardHeaderIcon: {
    '&$warningCardHeader,&$successCardHeader,&$infoCardHeader,&$primaryCardHeader': {
      background: 'transparent',
      boxShadow: 'none',
    },
    '& i,& .material-icons': {
      width: '33px',
      height: '33px',
      textAlign: 'center',
      lineHeight: '33px',
    },
    '& svg': {
      width: '24px',
      height: '24px',
      textAlign: 'center',
      lineHeight: '33px',
      margin: '5px 4px 0px',
    },
  },
  warningCardHeader: {
    color: '#fff',
    '&:not($cardHeaderIcon)': {
      background: `linear-gradient(60deg, #e5ad06, #FFECB4)`,
      boxShadow: `0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px rgba(rgb(255, 193, 7),.4)`,
    },
  },
  successCardHeader: {
    color: '#fff',
    '&:not($cardHeaderIcon)': {
      background: `linear-gradient(60deg, #2D4159, #2D4159)`,
      boxShadow: `0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px rgba(45, 65, 89,.4)`,
    },
  },
  infoCardHeader: {
    color: '#fff',
    '&:not($cardHeaderIcon)': {
      background: `linear-gradient(60deg, #00acc1, #26c6da)`,
      boxShadow: `0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px rgba(45, 65, 89,.4)`,
    },
  },
  primaryCardHeader: {
    color: '#fff',
    '&:not($cardHeaderIcon)': {
      background: `linear-gradient(60deg, #2D4159, rgba(6,119,161, 0))`,
      boxShadow: `0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px rgba(0, 18, 51,.4)`,
    },
  },
  cardIcon: {
    '&$warningCardHeader,&$successCardHeader,&$infoCardHeader,&$primaryCardHeader': {
      borderRadius: '3px',
      backgroundColor: '#999',
      padding: '15px',
      marginTop: '-20px',
      marginRight: '15px',
      float: 'left',
    },
  },
});

export default cardStyles;
