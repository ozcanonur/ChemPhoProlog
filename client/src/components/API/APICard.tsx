/* eslint-disable no-lone-blocks */
import React from 'react';

import CardGeneric from 'components/Misc/Card/CardGeneric';
import Typography from '@material-ui/core/Typography';

interface Props {
  content: {
    cardTitle: string;
    header: string;
    text: string;
  };
}

const APICard = ({ content }: Props) => {
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
