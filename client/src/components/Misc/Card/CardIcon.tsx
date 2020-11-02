import React from 'react';
import classNames from 'classnames';
import makeStyles from '@material-ui/core/styles/makeStyles';

import cardStyles from './styles/card';

const useStyles = makeStyles(cardStyles);

interface Props {
  className?: string;
  children?: JSX.Element | JSX.Element[] | string;
  color?: string;
}

const CardIcon = (props: Props) => {
  const classes = useStyles();
  const { className, children, color, ...rest } = props;
  const cardIconClasses = classNames({
    [classes.cardIcon]: true,
    // @ts-ignore
    [classes[`${color}CardHeader`]]: color,
    // @ts-ignore
    [className]: className !== undefined,
  });
  return (
    <div className={cardIconClasses} {...rest}>
      {children}
    </div>
  );
};

export default CardIcon;
