import React from 'react';
import classNames from 'classnames';
import makeStyles from '@material-ui/core/styles/makeStyles';
import styles from 'assets/jss/material-dashboard-react/components/cardHeaderStyle';

const useStyles = makeStyles(styles);

export default function CardHeader(props) {
  const classes = useStyles();
  const { className, children, color, plain, stats, icon, ...rest } = props;
  const cardHeaderClasses = classNames({
    [classes.cardHeader]: true,
    [classes[`${color}CardHeader`]]: color,
    [classes.cardHeaderPlain]: plain,
    [classes.cardHeaderStats]: stats,
    [classes.cardHeaderIcon]: icon,
    [className]: className !== undefined,
  });
  return (
    <div className={cardHeaderClasses} {...rest}>
      {children}
    </div>
  );
}
