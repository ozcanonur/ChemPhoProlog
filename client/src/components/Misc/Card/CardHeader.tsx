import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import makeStyles from '@material-ui/core/styles/makeStyles';

import cardStyles from './styles/card';

const useStyles = makeStyles(cardStyles);

interface Props {
  className?: string;
  children?: JSX.Element | JSX.Element[] | string;
  color?: string;
  plain?: boolean;
  stats?: boolean;
  icon?: boolean;
  style?: CSSProperties;
}

const CardHeader = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { className, children, color, plain, stats, icon, ...rest } = props;
  const cardHeaderClasses = classNames({
    [classes.cardHeader]: true,
    // @ts-ignore
    [classes[`${color}CardHeader`]]: color,
    [classes.cardHeaderPlain]: plain,
    [classes.cardHeaderStats]: stats,
    [classes.cardHeaderIcon]: icon,
    // @ts-ignore
    [className]: className !== undefined,
  });
  return (
    <div className={cardHeaderClasses} {...rest}>
      {children}
    </div>
  );
};

export default CardHeader;
