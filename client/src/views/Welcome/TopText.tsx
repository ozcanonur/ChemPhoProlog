import React from 'react';

import CardGeneric from 'components/Card/CardGeneric';
import Typography from '@material-ui/core/Typography';

const TopText = (): JSX.Element => {
  return (
    <CardGeneric color='primary' cardTitle='What is ChemPhoProlog?'>
      <Typography variant='body1'>
        The diverse and highly complex nature of modern phosphoproteomics
        research produces a high volume of data. Chemical phosphoproteomics
        especially, is amenable to a variety of analytical approaches. In this
        study we propose novel logic-based algorithms that overcome the
        limitations of existing tools used for analysis of these types of
        datasets. Initially we developed a first order deductive, logic-based
        model and populated it with a scoring system, with which we were able to
        expand from its initially Boolean nature. This allowed us to identify
        previously unreported inhibitor-kinase relationships which could offer
        novel therapeutic targets for further investigation. We also present the
        model and its findings in a human readable and explanation-integrated
        manner. This offers an open-source model blueprint to act as a resource
        for its application in more and diverse data sets.
        <br />
        <br />
        The diverse and highly complex nature of modern phosphoproteomics
        research produces a high volume of data. Chemical phosphoproteomics
        especially, is amenable to a variety of analytical approaches. In this
        study we propose novel logic-based algorithms that overcome the
        limitations of existing tools used for analysis of these types of
        datasets. Initially we developed a first order deductive, logic-based
        model and populated it with a scoring system, with which we were able to
        expand from its initially Boolean nature. This allowed us to identify
        previously unreported inhibitor-kinase relationships which could offer
        novel therapeutic targets for further investigation. We also present the
        model and its findings in a human readable and explanation-integrated
        manner. This offers an open-source model blueprint to act as a resource
        for its application in more and diverse data sets.
      </Typography>
    </CardGeneric>
  );
};

export default TopText;
