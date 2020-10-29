import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  cardBody: {
    padding: '0.9375rem 20px',
    flex: '1 1 auto',
    WebkitBoxFlex: 1,
    position: 'relative',
  },
});

const CardBody = (props): JSX.Element => {
  const classes = useStyles();
  const { className, children, ...rest } = props;

  return (
    <div className={classes.cardBody} {...rest}>
      {children}
    </div>
  );
};

export default CardBody;
