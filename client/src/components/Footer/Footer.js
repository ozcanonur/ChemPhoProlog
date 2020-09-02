/*eslint-disable*/
import React from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';

import styles from 'assets/jss/material-dashboard-react/components/footerStyle.js';

const useStyles = makeStyles(styles);

export default function Footer() {
  const classes = useStyles();

  return <footer className={classes.footer}></footer>;
}
