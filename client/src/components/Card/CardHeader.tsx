import React from 'react';
import classNames from 'classnames';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  cardHeader: {
    padding: '0.75rem 1.25rem',
    marginBottom: '0',
    borderBottom: 'none',
    background: 'transparent',
    zIndex: '3 !important',
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
});

const CardHeader = (props): JSX.Element => {
  const classes = useStyles();
  const { className, children, color, plain, stats, icon, ...rest } = props;
  const cardHeaderClasses = classNames({
    [classes.cardHeader]: true,
    [classes[`${color}CardHeader`]]: color,
    [classes.cardHeaderPlain]: plain,
    [classes.cardHeaderStats]: stats,
    [classes.cardHeaderIcon]: icon,
    [className]: className !== undefined,
  });
  return (
    <div className={cardHeaderClasses} {...rest}>
      {children}
    </div>
  );
};

export default CardHeader;
