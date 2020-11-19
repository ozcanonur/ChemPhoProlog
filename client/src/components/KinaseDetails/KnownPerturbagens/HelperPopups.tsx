import React from 'react';

import HelperPopup from 'components/Misc/HelperPopup/HelperPopup';

export const helperPopups = [
  {
    position: { row: 3, column: 3 },
    component: (
      <HelperPopup>
        <div>Inspect this perturbagen</div>
      </HelperPopup>
    ),
  },
  {
    position: { row: 5, column: 3 },
    component: (
      <HelperPopup>
        <div>Go to Chemspider</div>
      </HelperPopup>
    ),
  },
];
