import React, { CSSProperties } from 'react';

import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';

import buttonStyles from './styles';

const useStyles = makeStyles(buttonStyles);

interface Props {
  color?: string;
  round?: boolean;
  children?: JSX.Element | JSX.Element[] | string;
  className?: string;
  size?: string;
  justIcon?: boolean;
  style?: CSSProperties;
  onClick?: (x: any) => void;
  disabled?: boolean;
}

const RegularButton = (props: Props) => {
  const classes = useStyles();
  const { color, round, children, size, justIcon, className, disabled, ...rest } = props;
  const btnClasses = classNames({
    [classes.button]: true,
    [classes.disabled]: disabled,
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
