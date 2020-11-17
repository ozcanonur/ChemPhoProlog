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
  iconClassName?: string;
  iconStyle?: CSSProperties;
}

const HelperPopup = ({ className, style, buttonOnClick, children, iconClassName, iconStyle }: Props) => {
  const classes = useStyles();

  return (
    <div className={className} style={style}>
      <ReplyIcon className={`${classes.helperIcon} ${iconClassName}`} style={iconStyle} />
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
