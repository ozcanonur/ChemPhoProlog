import React from 'react';
import { useLocalStorage } from 'utils/customHooks';
import HelperPopup from 'components/Misc/HelperPopup/HelperPopup';

export const HelperPopupGetPathway = () => {
  const [isVisible, setIsVisible] = useLocalStorage('getPathwayHelpVisible', true);

  const disableHelp = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible ? (
        <HelperPopup style={{ position: 'absolute', right: '20%', bottom: 0 }} buttonOnClick={disableHelp}>
          <div>Get pathway for selected inputs!</div>
        </HelperPopup>
      ) : null}
    </>
  );
};
