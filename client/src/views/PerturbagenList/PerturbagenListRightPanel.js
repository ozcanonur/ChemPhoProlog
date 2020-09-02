import React from 'react';

import NewFindingsCard from 'views/ListComponents/NewFindingsCard';
import ListRightPanel from 'views/ListComponents/ListRightPanel';

const PerturbagenListRightPanel = ({ selectedInfo }) => {
  const findingsProps = {
    leftIconTitle: 'New Targets',
    leftIconText: '12',
    rightIconTitle: 'New PDTs',
    rightIconText: '34',
  };

  const props = {
    topHeaderTitle: 'Perturbagen Specification',
    topHeaderSubTitle: 'Details',
    selectedEleTitle: selectedInfo.name,
    selectedEleDetailsBody: (
      <div style={{ textAlign: 'center' }}>
        <img src={`http://www.chemspider.com/ImagesHandler.ashx?id=${selectedInfo.chemspider_id}&w=250&h=250`} alt='' />
      </div>
    ),
    selectedEleDetailsBottomBody: <NewFindingsCard {...findingsProps} />,
  };

  return <ListRightPanel {...props} />;
};

export default PerturbagenListRightPanel;
