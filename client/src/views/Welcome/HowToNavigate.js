import React from 'react';

import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import makeStyles from '@material-ui/core/styles/makeStyles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle';

const useStyles = makeStyles(styles);

const navigationTexts = [
  'The diverse and highly complex nature of modern phosphoproteomics research produces a',
  ' High volume of data. Chemical phosphoproteomics especially, is amenable to a variety',
  'Of analytical approaches. In this study we propose novel logic-based algorithms that',
  'The diverse and highly complex nature of modern phosphoproteomics research produces a',
  ' High volume of data. Chemical phosphoproteomics especially, is amenable to a variety',
  'Of analytical approaches. In this study we propose novel logic-based algorithms that',
];

const HowToNavigate = () => {
  const classes = useStyles();
  return (
    <Card>
      <CardHeader color='primary'>
        <h4 className={classes.cardTitleWhite}>How to navigate?</h4>
      </CardHeader>
      <CardBody>
        <List>
          {navigationTexts.map((e, key) => (
            <ListItem key={key}>
              <ListItemIcon>
                <KeyboardArrowRight />
              </ListItemIcon>
              <ListItemText primary={e} />
            </ListItem>
          ))}
        </List>
      </CardBody>
    </Card>
  );
};

export default HowToNavigate;
