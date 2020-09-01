import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle';

import Card from './Card';
import CardBody from './CardBody';
import CardHeader from './CardHeader';

const useStyles = makeStyles(styles);

const CardGeneric = (props) => {
  const classes = useStyles();
  const { color, cardTitle, cardSubtitle, children, style } = props;

  return (
    <Card style={style}>
      <CardHeader color={color}>
        <h4 className={classes.cardTitleWhite}>{cardTitle}</h4>
        <p className={classes.cardCategoryWhite}>{cardSubtitle}</p>
      </CardHeader>
      <CardBody>{children}</CardBody>
    </Card>
  );
};

export default CardGeneric;
