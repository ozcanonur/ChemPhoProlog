import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import styles from 'assets/jss/material-dashboard-react/components/typographyStyle';

const useStyles = makeStyles(styles);

export default function Quote(props) {
  const classes = useStyles();
  const { text, author } = props;
  return (
    <blockquote className={`${classes.defaultFontStyle} ${classes.quote}`}>
      <p className={classes.quoteText}>{text}</p>
      <small className={classes.quoteAuthor}>{author}</small>
    </blockquote>
  );
}
