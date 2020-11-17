/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { CSSProperties } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ReplyIcon from '@material-ui/icons/Reply';

import helperPopupStyles from './styles';

const useStyles = makeStyles(helperPopupStyles);

interface Props {
  className?: string;
  style?: CSSProperties;
  buttonOnClick: () => void;
  children?: JSX.Element | JSX.Element[];
}

const HelperPopup = ({ className, style, buttonOnClick, children }: Props) => {
  const classes = useStyles();

  return (
    <div className={className} style={style}>
      <ReplyIcon className={classes.helperIcon} />
      <div className={classes.helperTextContainer}>
        {children}
        <div onClick={buttonOnClick} className={classes.helperButton}>
          Got it
        </div>
      </div>
    </div>
  );
};

export default HelperPopup;
