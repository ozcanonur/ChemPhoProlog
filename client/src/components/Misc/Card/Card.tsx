import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import cardStyles from './styles/card';

const useStyles = makeStyles(cardStyles);

const Card = (props: any) => {
  const classes = useStyles();

  const { children, ...rest } = props;

  return (
    <div className={classes.card} {...rest}>
      {children}
    </div>
  );
};

export default Card;
