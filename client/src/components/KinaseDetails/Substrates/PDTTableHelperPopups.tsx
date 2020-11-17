import React from 'react';

import { useLocalStorage } from 'utils/customHooks';
import HelperPopup from 'components/Misc/HelperPopup/HelperPopup';

const PDTTableHelperPopups = () => {
  const [isLeftHelpVisible, setIsLeftHelpVisible] = useLocalStorage('kinasePDTsLeftHelpVisible', true);
  const [isRightHelpVisible, setIsRightHelpVisible] = useLocalStorage('kinasePDTsRightHelpVisible', true);

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

export default PDTTableHelperPopups;
