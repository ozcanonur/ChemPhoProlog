import React from 'react';

import CardGeneric from 'components/Card/CardGeneric';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Typography from '@material-ui/core/Typography';

import KnownSubstratesTable from 'views/KinaseDetails/Substrates/KnownSubstrates/KnownSubstratesTable';

const KnownSubstrates = () => {
  return (
    <GridContainer>
      <GridItem xs={12} lg={6}>
        <KnownSubstratesTable />
      </GridItem>
      <GridItem xs={12} lg={6}>
        <GridContainer direction='column'>
          <GridItem md>
            <CardGeneric color='primary' cardTitle='Substrate specification' cardSubtitle='Details'>
              <Typography variant='body1'>
                The diverse and highly complex nature of modern phosphoproteomics research produces a high volume of
                data. Chemical phosphoproteomics especially, is amenable to a variety of analytical approaches. In this
                study we propose novel logic-based algorithms that overcome the limitations of existing tools used for
                analysis of these types of datasets. Initially we developed a first order deductive, logic-based model
                and populated it with a scoring system, with which we were able to expand from its initially Boolean
                nature. This allowed us to identify 16 previously unreported inhibitor-kinase relationships which could
                offer novel therapeutic targets for further investigation. We also present the model and its findings in
                a human readable and 18 explanation-integrated manner. This offers an open-source model blueprint to act
                as a resource 19 for its application in more and diverse data sets.
              </Typography>
            </CardGeneric>
          </GridItem>
          <GridItem md>
            <CardGeneric color='primary' cardTitle='Substrate specification' cardSubtitle='Details'>
              <Typography variant='body1'>
                The diverse and highly complex nature of modern phosphoproteomics research produces a high volume of
                data. Chemical phosphoproteomics especially, is amenable to a variety of analytical approaches. In this
                study we propose novel logic-based algorithms that overcome the limitations of existing tools used for
                analysis of these types of datasets. Initially we developed a first order deductive, logic-based model
                and populated it with a scoring system, with which we were able to expand from its initially Boolean
                nature. This allowed us to identify 16 previously unreported inhibitor-kinase relationships which could
                offer novel therapeutic targets for further investigation. We also present the model and its findings in
                a human readable and 18 explanation-integrated manner. This offers an open-source model blueprint to act
                as a resource 19 for its application in more and diverse data sets.
              </Typography>
            </CardGeneric>
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
};

export default KnownSubstrates;
