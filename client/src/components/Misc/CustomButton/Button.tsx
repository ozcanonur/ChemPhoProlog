import React, { CSSProperties } from 'react';

import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';

import buttonStyles from './styles';

const useStyles = makeStyles(buttonStyles);

interface Props {
  color?: string;
  round?: boolean;
  children?: JSX.Element | JSX.Element[];
  size?: string;
  justIcon?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  disabled?: boolean;
}

const RegularButton = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { color, round, children, size, justIcon, className, ...rest } = props;
  const btnClasses = classNames({
    [classes.button]: true,
    // @ts-ignore
    [classes[size]]: size,
    // @ts-ignore
    [classes[color]]: color,
    [classes.round]: round,
    [classes.justIcon]: justIcon,
    // @ts-ignore
    [className]: className,
  });
  return (
    <Button {...rest} className={btnClasses}>
      {children}
    </Button>
  );
};

export default RegularButton;
