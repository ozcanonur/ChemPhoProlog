import React from 'react';
import classNames from 'classnames';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
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

const CardIcon = (props): JSX.Element => {
  const classes = useStyles();
  const { className, children, color, ...rest } = props;
  const cardIconClasses = classNames({
    [classes.cardIcon]: true,
    [classes[`${color}CardHeader`]]: color,
    [className]: className !== undefined,
  });
  return (
    <div className={cardIconClasses} {...rest}>
      {children}
    </div>
  );
};

export default CardIcon;
