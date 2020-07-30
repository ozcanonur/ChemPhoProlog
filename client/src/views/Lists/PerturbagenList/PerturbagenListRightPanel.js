import React from 'react';

import NewFindingsCard from 'views/Lists/NewFindingsCard';
import ListRightPanel from 'views/Lists/ListRightPanel';

const PerturbagenListRightPanel = ({ perturbagenInfo }) => {
  const findingsProps = {
    leftIconTitle: 'New Perturbagens',
    leftIconText: '12',
    rightIconTitle: 'New PDTs',
    rightIconText: '34',
  };

  const props = {
    topHeaderTitle: 'Perturbagen Specification',
    topHeaderSubTitle: 'Details',
    selectedEleTitle: perturbagenInfo.name,
    selectedEleDetailsBody: (
      <div style={{ textAlign: 'center' }}>
        <img
          src={`http://www.chemspider.com/ImagesHandler.ashx?id=${perturbagenInfo.chemspider_id}&w=250&h=250`}
        />
      </div>
    ),
    selectedEleDetailsBottomBody: <NewFindingsCard {...findingsProps} />,
  };

  return <ListRightPanel {...props} />;
};

export default PerturbagenListRightPanel;
