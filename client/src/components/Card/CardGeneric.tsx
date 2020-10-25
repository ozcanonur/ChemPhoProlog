import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Card from './Card';
import CardBody from './CardBody';
import CardHeader from './CardHeader';

const useStyles = makeStyles({
  cardTitleWhite: {
    color: '#fff',
    marginTop: '0px',
    minHeight: 'auto',
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
  cardCategoryWhite: {
    color: `rgba(255,255,255,.62)`,
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
});

const CardGeneric = (props): JSX.Element => {
  const classes = useStyles();
  const {
    color,
    cardTitle,
    cardSubtitle,
    children,
    style,
    headerStyle,
  } = props;

  return (
    <Card style={style}>
      <CardHeader color={color} style={headerStyle}>
        <h4 className={classes.cardTitleWhite}>{cardTitle}</h4>
        <p className={classes.cardCategoryWhite}>{cardSubtitle}</p>
      </CardHeader>
      <CardBody>{children}</CardBody>
    </Card>
  );
};

export default CardGeneric;
