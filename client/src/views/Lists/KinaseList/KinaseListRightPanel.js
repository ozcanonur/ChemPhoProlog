import React from 'react';

import ListRightPanel from 'views/Lists/ListRightPanel';
import NewFindingsCard from 'views/Lists/NewFindingsCard';

const KinaseDescriptionBody = ({ selectedInfo }) => {
  return (
    <React.Fragment>
      <p>{selectedInfo.description}</p>
      <p>
        <strong>Families: </strong>
        {selectedInfo.families}
      </p>
      <p>
        <strong>Alternative names: </strong>
        {selectedInfo.gene_synonyms}{' '}
      </p>
      <p>
        <strong>Detected in: </strong>
        {selectedInfo.expressed_in}{' '}
      </p>
    </React.Fragment>
  );
};

const KinaseListRightPanel = ({ selectedInfo }) => {
  const newFindingsProps = {
    leftIconTitle: 'New Perturbagens',
    leftIconText: '6',
    rightIconTitle: 'New PDTs',
    rightIconText: '24',
  };

  const props = {
    topHeaderTitle: 'Kinase Specification',
    topHeaderSubTitle: 'Details',
    selectedEleTitle: selectedInfo.kinase_name,
    selectedEleDetailsBody: <KinaseDescriptionBody selectedInfo={selectedInfo} />,
    selectedEleDetailsBottomBody: <NewFindingsCard {...newFindingsProps} />,
  };

  return <ListRightPanel {...props} />;
};

export default KinaseListRightPanel;
