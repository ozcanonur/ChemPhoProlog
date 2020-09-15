import React from 'react';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import CardGeneric from 'components/Card/CardGeneric';

import PhosphositesOfInterestTable from 'views/KinaseDetails/Description/PhosphositesOfInterestTable';

const Description = () => {
  const kinase = window.location.href.split('/')[4];

  return (
    <GridContainer direction='column' style={{ padding: '2em' }}>
      <GridItem>
        <GridContainer direction='row' alignItems='stretch'>
          <GridItem lg={6}>
            <CardGeneric color='primary' cardTitle='PLACEHOLDER' cardSubtitle='placeholder'>
              The diverse and highly complex nature of modern phosphoproteomics research produces a high
              volume of data. Chemical phosphoproteomics especially, is amenable to a variety of analytical
              approaches. In this study we propose novel logic-based algorithms that overcome the limitations
              of existing tools used for analysis of these types of datasets. Initially we developed a first
              order deductive, logic-based model and populated it with a scoring system, with which we were
              able to expand from its initially Boolean nature. This allowed us to identify 16 previously
              unreported inhibitor-kinase relationships which could offer novel therapeutic targets for
            </CardGeneric>
          </GridItem>
          <GridItem lg={6}>
            <CardGeneric color='primary' cardTitle='PLACEHOLDER' cardSubtitle='placeholder'>
              The diverse and highly complex nature of modern phosphoproteomics research produces a high
              volume of data. Chemical phosphoproteomics especially, is amenable to a variety of analytical
              approaches. In this study we propose novel logic-based algorithms that overcome the limitations
              of existing tools used for analysis of these types of datasets. Initially we developed a first
              order deductive, logic-based model and populated it with a scoring system, with which we were
              able to expand from its initially Boolean nature. This allowed us to identify 16 previously
              unreported inhibitor-kinase relationships which could offer novel therapeutic targets for
            </CardGeneric>
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem>
        <PhosphositesOfInterestTable kinase={kinase} />
      </GridItem>
    </GridContainer>
  );
};

export default Description;
