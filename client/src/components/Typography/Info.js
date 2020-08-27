import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import styles from 'assets/jss/material-dashboard-react/components/typographyStyle';

const useStyles = makeStyles(styles);

export default function Info(props) {
  const classes = useStyles();
  const { children } = props;
  return <div className={`${classes.defaultFontStyle} ${classes.infoText}`}>{children}</div>;
}
