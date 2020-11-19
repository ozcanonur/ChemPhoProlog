/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { CSSProperties } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import helperPopupStyles from './styles';

const useStyles = makeStyles(helperPopupStyles);

interface Props {
  className?: string;
  style?: CSSProperties;
  children?: JSX.Element | JSX.Element[];
  arrowPosition?: string;
}

const HelperPopup = ({ className, style, children, arrowPosition = 'left' }: Props) => {
  const classes = useStyles();

  let arrowClasses = `${classes.arrow} `;
  let containerClasses = `${classes.container} `;
  if (arrowPosition === 'right') {
    arrowClasses += classes.arrowRight;
    containerClasses += classes.helperTextContainerRight;
  } else if (arrowPosition === 'up') {
    arrowClasses += classes.arrowUp;
    containerClasses += classes.helperTextContainerUp;
  } else if (arrowPosition === 'down') {
    arrowClasses += classes.arrowDown;
    containerClasses += classes.helperTextContainerDown;
  } else {
    arrowClasses += classes.arrowLeft;
  }

  return (
    <div className={`${containerClasses} ${className}`} style={style}>
      {/* <div className={arrowClasses} /> */}
      <div className={classes.helperTextContainer}>{children}</div>
    </div>
  );
};

export default HelperPopup;
