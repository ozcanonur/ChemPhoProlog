import React from 'react';

import HelperPopup from 'components/Misc/HelperPopup/HelperPopup';
import { useLocalStorage } from 'utils/customHooks';

const HelperPopups = () => {
  const [isLeftHelpVisible, setIsLeftHelpVisible] = useLocalStorage('kinaseDescriptionLeftHelpVisible', true);
  const [isRightHelpVisible, setIsRightHelpVisible] = useLocalStorage('kinaseDescriptionRightHelpVisible', true);

  const disableLeftHelp = () => {
    setIsLeftHelpVisible(false);
  };

  const disableRightHelp = () => {
    setIsRightHelpVisible(false);
  };

  return (
    <>
      {isLeftHelpVisible ? (
        <HelperPopup style={{ position: 'absolute', right: '16%', top: '22%' }} buttonOnClick={disableLeftHelp}>
          <div>Inspect pathways if present</div>
        </HelperPopup>
      ) : null}
      {isRightHelpVisible ? (
        <HelperPopup style={{ position: 'absolute', left: '3%', top: '22%' }} buttonOnClick={disableRightHelp}>
          <div>Check out observation data</div>
        </HelperPopup>
      ) : null}
    </>
  );
};

export default HelperPopups;
