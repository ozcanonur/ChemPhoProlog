import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
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
});

const CardFooter = (props): JSX.Element => {
  const classes = useStyles();
  const { className, children, stats, ...rest } = props;

  const classNames = stats
    ? `${classes.cardFooter} ${classes.cardFooterStats}`
    : `${classes.cardFooter}`;

  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
};

export default CardFooter;
