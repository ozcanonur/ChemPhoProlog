import React from 'react';

import { useLocalStorage } from 'utils/customHooks';
import HelperPopup from 'components/Misc/HelperPopup/HelperPopup';

const HelperPopups = () => {
  const [isRightHelpVisible, setIsRightHelpVisible] = useLocalStorage('kinaseKnownPerturbagensRightHelpVisible', true);

  const disableRightHelp = () => {
    setIsRightHelpVisible(false);
  };

  return (
    <>
      {isRightHelpVisible ? (
        <HelperPopup style={{ position: 'absolute', right: 0, top: '22%' }} buttonOnClick={disableRightHelp}>
          <div>Inspect this perturbagen</div>
        </HelperPopup>
      ) : null}
    </>
  );
};

export default HelperPopups;
