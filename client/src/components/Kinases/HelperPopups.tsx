import React from 'react';

import HelperPopup from 'components/Misc/HelperPopup/HelperPopup';

export const helperPopups = [
  {
    position: { row: 0, column: 0 },
    component: (
      <HelperPopup>
        <div>Check out the phosphosites on this kinase</div>
        <div>Get pathways for them</div>
      </HelperPopup>
    ),
  },
  {
    position: { row: 1, column: 4 },
    component: (
      <HelperPopup>
        <div>{`Inspect this kinase with (>)`}</div>
        <div>Add to sidebar with (+)</div>
      </HelperPopup>
    ),
  },
  {
    position: { row: 5, column: 2 },
    component: (
      <HelperPopup>
        <div>Go to Uniprot</div>
      </HelperPopup>
    ),
  },
  // {
  //   position: { row: 5, column: 2 },
  //   component: (
  //     <div style={{ position: 'absolute' }}>
  //       <HelperPopup arrowPosition='left'>
  //         <div>Go to Kinase details</div>
  //       </HelperPopup>
  //     </div>
  //   ),
  // },
];
