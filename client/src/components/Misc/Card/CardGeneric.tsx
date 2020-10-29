import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Card from './Card';
import CardBody from './CardBody';
import CardHeader from './CardHeader';

import cardStyles from './styles/card';

const useStyles = makeStyles(cardStyles);

interface Props {
  color?: string;
  cardTitle?: string;
  cardSubtitle?: string;
  children?: any;
  style?: any;
  headerStyle?: any;
}

const CardGeneric = (props: Props): JSX.Element => {
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
