import React from 'react';

import HelperPopup from 'components/Misc/HelperPopup/HelperPopup';

export const helperPopups = [
  {
    position: { row: 0, column: 3 },
    component: (
      <HelperPopup>
        <div>{`Inspect this perturbagen with (>)`}</div>
      </HelperPopup>
    ),
  },
];
