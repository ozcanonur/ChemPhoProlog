import React from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  defaultFontStyle: {
    fontSize: '14px',
  },
  warningText: {
    color: '#FFC107',
  },
});

interface Props {
  children: JSX.Element;
}

const Danger = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { children } = props;
  return (
    <div className={`${classes.defaultFontStyle} ${classes.warningText}`}>
      {children}
    </div>
  );
};

export default Danger;
