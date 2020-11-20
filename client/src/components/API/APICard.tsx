/* eslint-disable no-lone-blocks */
import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import CardGeneric from 'components/Misc/Card/CardGeneric';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  bodyText: {
    marginTop: '1.5rem',
  },
});

interface Props {
  content: {
    cardTitle: string;
    header: string;
    text: string;
  };
}

const APICard = ({ content }: Props) => {
  const classes = useStyles();

  const { cardTitle, header, text } = content;

  return (
    <CardGeneric color='primary' cardTitle={cardTitle}>
      <Typography variant='h5'>{header}</Typography>
      <Typography variant='body1' className={classes.bodyText}>
        {text}
      </Typography>
    </CardGeneric>
  );
};

export default APICard;
