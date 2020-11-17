import React from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import HelperPopup from 'components/Misc/HelperPopup/HelperPopup';
import { useLocalStorage } from 'utils/customHooks';

import kinaseListPhosphositesStyles from './styles/kinases';

const useStyles = makeStyles(kinaseListPhosphositesStyles);

const HelperPopups = () => {
  const classes = useStyles();

  const [isLeftHelpVisible, setIsLeftHelpVisible] = useLocalStorage('kinasesLeftHelpVisible', true);
  const [isRightHelpVisible, setIsRightHelpVisible] = useLocalStorage('kinasesRightHelpVisible', true);

  const disableLeftHelp = () => {
    setIsLeftHelpVisible(false);
  };

  const disableRightHelp = () => {
    setIsRightHelpVisible(false);
  };

  return (
    <>
      {isLeftHelpVisible ? (
        <HelperPopup className={classes.leftHelperPopup} buttonOnClick={disableLeftHelp}>
          <div>Check out the phosphosites on this kinase</div>
          <div>Get pathways for them</div>
        </HelperPopup>
      ) : null}
      {isRightHelpVisible ? (
        <HelperPopup className={classes.rightHelperPopup} buttonOnClick={disableRightHelp}>
          <div>{`Inspect this kinase with (>)`}</div>
          <div>Add to sidebar with (+)</div>
        </HelperPopup>
      ) : null}
    </>
  );
};

export default HelperPopups;
