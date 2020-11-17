import React from 'react';

import { useLocalStorage } from 'utils/customHooks';
import HelperPopup from 'components/Misc/HelperPopup/HelperPopup';

const KnownSubstratesHelperPopups = () => {
  const [isLeftHelpVisible, setIsLeftHelpVisible] = useLocalStorage('kinaseKnownSubstratesLeftHelpVisible', true);
  const [isRightHelpVisible, setIsRightHelpVisible] = useLocalStorage('kinaseKnownSubstratesRightHelpVisible', true);

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
          <div>Check out observation data if present</div>
        </HelperPopup>
      ) : null}
    </>
  );
};

export default KnownSubstratesHelperPopups;
