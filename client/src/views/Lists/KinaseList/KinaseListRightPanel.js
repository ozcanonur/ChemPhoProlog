import React, { useContext } from 'react';

import ListRightPanel from 'views/Lists/ListRightPanel';
import NewFindings from 'views/Lists/NewFindingsCard';

import { HomeContext } from 'layouts/Home';

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

const KinaseListRightPanel = () => {
  const selectedInfo = useContext(HomeContext).kinaseListContext.selectedInfo;

  const findingsProps = {
    leftIconTitle: 'New Perturbagens',
    leftIconText: '8',
    rightIconTitle: 'New PDTs',
    rightIconText: '21',
  };

  const props = {
    topHeaderTitle: 'Kinase Specification',
    topHeaderSubTitle: 'Details',
    selectedEleTitle: selectedInfo.kinase_name,
    selectedEleDetailsBody: <KinaseDescriptionBody selectedInfo={selectedInfo} />,
    selectedEleDetailsBottomBody: <NewFindings {...findingsProps} />,
  };

  return <ListRightPanel {...props} />;
};

export default KinaseListRightPanel;
