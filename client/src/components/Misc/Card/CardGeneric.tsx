import React, { CSSProperties } from 'react';
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
  className?: string;
  children?: JSX.Element | JSX.Element[] | string | any;
  style?: CSSProperties;
  headerStyle?: CSSProperties;
  bodyStyle?: CSSProperties;
}

const CardGeneric = (props: Props) => {
  const classes = useStyles();
  const { color, cardTitle, cardSubtitle, children, style, headerStyle, bodyStyle, ...rest } = props;

  return (
    <Card style={style} {...rest}>
      <CardHeader color={color} style={headerStyle}>
        <h4 className={classes.cardTitleWhite}>{cardTitle}</h4>
        <p className={classes.cardCategoryWhite}>{cardSubtitle}</p>
      </CardHeader>
      <CardBody style={bodyStyle}>{children}</CardBody>
    </Card>
  );
};

export default CardGeneric;
