import React from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';

import styles from 'assets/jss/material-dashboard-react/components/typographyStyle';

const useStyles = makeStyles(styles);

export default function Success(props) {
  const classes = useStyles();
  const { children } = props;
  return <div className={`${classes.defaultFontStyle} ${classes.successText}`}>{children}</div>;
}
