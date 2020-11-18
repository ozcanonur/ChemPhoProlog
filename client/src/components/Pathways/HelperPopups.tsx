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
        <HelperPopup style={{ position: 'absolute', right: '23%', bottom: 0 }} buttonOnClick={disableHelp}>
          <div>Get pathway for selected inputs.</div>
          <div>You can run again until you like the view!</div>
        </HelperPopup>
      ) : null}
    </>
  );
};

export const HelperPopupPathsTable = () => {
  const [isVisible, setIsVisible] = useLocalStorage('pathsTableHelpVisible', true);

  const disableHelp = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible ? (
        <HelperPopup style={{ position: 'absolute', right: '1%', top: '21%' }} buttonOnClick={disableHelp}>
          <div>Go back up to the pathway</div>
          <div>To see the items added</div>
          <div>Watch the path animation!</div>
        </HelperPopup>
      ) : null}
    </>
  );
};
