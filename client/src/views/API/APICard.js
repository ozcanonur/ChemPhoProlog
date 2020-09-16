/* eslint-disable no-lone-blocks */
import React from 'react';

import CardGeneric from 'components/Card/CardGeneric';
import Typography from '@material-ui/core/Typography';

const APICard = ({ content }) => {
  const { cardTitle, header, text } = content;

  return (
    <CardGeneric color='primary' cardTitle={cardTitle}>
      <Typography variant='h5'>{header}</Typography>
      <Typography variant='body1' style={{ marginTop: '1.5rem' }}>
        {text}
      </Typography>
    </CardGeneric>
  );
};

export default APICard;

{
  /* <Typography variant='body1'>Parameters:</Typography>
      <Typography variant='body1'>
        cellLine: &apos;MCF7&apos; or &apos;HL60&apos; or &apos;NTERA2&apos;
        <br />
        perturbagen: Perturbagen which was used in the experiment
        <br />
        substrate: Phosphosite which the bottom-up pathway will be constructed from
        <br />
        onlyKinaseEnds: Retrieve the paths that only end with a kinase or a phosphatase
      </Typography> */
}
