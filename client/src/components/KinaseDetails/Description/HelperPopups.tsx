import React from 'react';

import HelperPopup from 'components/Misc/HelperPopup/HelperPopup';

export const helperPopups = [
  {
    position: { row: 3, column: 0 },
    component: (
      <HelperPopup>
        <div>Check out observation data</div>
      </HelperPopup>
    ),
  },
  {
    position: { row: 0, column: 7 },
    component: (
      <HelperPopup>
        <div>Inspect pathways if present</div>
      </HelperPopup>
    ),
  },
];
