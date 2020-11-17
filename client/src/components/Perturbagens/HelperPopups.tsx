import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { useLocalStorage } from 'utils/customHooks';
import HelperPopup from 'components/Misc/HelperPopup/HelperPopup';
import perturbagensStyles from './styles/perturbagens';

const useStyles = makeStyles(perturbagensStyles);

const HelperPopups = () => {
  const classes = useStyles();

  const [isRightHelpVisible, setIsRightHelpVisible] = useLocalStorage('perturbagensRightHelpVisible', true);

  const disableRightHelp = () => {
    setIsRightHelpVisible(false);
  };

  return (
    <>
      {isRightHelpVisible ? (
        <HelperPopup className={classes.rightHelperPopup} buttonOnClick={disableRightHelp}>
          <div>Inspect this perturbagen</div>
        </HelperPopup>
      ) : null}
    </>
  );
};

export default HelperPopups;
