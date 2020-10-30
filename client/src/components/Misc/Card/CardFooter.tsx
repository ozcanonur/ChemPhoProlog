import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import cardStyles from './styles/card';

const useStyles = makeStyles(cardStyles);

interface Props {
  className?: string;
  children?: JSX.Element | JSX.Element[];
  stats?: boolean;
}

const CardFooter = (props: Props): JSX.Element => {
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
