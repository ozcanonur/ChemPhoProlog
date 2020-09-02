import React from 'react';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import CardGeneric from 'components/Card/CardGeneric';

const ListRightPanel = (props) => {
  const {
    topHeaderTitle,
    topHeaderSubTitle,
    selectedEleTitle,
    selectedEleDetailsBody,
    selectedEleDetailsBottomBody,
  } = props;

  return (
    <CardGeneric color='primary' cardTitle={topHeaderTitle} cardSubtitle={topHeaderSubTitle} style={{ height: 918 }}>
      <GridContainer direction='column'>
        <GridItem>
          <CardGeneric color='primary' cardTitle={selectedEleTitle}>
            {selectedEleDetailsBody}
          </CardGeneric>
        </GridItem>
        <GridItem>{selectedEleDetailsBottomBody}</GridItem>
      </GridContainer>
    </CardGeneric>
  );
};

export default ListRightPanel;
