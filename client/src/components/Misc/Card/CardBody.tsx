import React, { CSSProperties } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import cardStyles from './styles/card';

const useStyles = makeStyles(cardStyles);

interface Props {
  children?: JSX.Element | JSX.Element[] | string;
  className?: string;
  style?: CSSProperties;
}

const CardBody = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { className, children, ...rest } = props;

  return (
    <div className={classes.cardBody} {...rest}>
      {children}
    </div>
  );
};

export default CardBody;
