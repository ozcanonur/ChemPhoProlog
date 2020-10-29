import React from 'react';

import Card from 'freshComponents/Misc/Card/Card';
import CardHeader from 'freshComponents/Misc/Card/CardHeader';
import CardBody from 'freshComponents/Misc/Card/CardBody';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import makeStyles from '@material-ui/core/styles/makeStyles';

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
});

const navigationTexts = [
  'The diverse and highly complex nature of modern phosphoproteomics research produces a',
  ' High volume of data. Chemical phosphoproteomics especially, is amenable to a variety',
  'Of analytical approaches. In this study we propose novel logic-based algorithms that',
  'The diverse and highly complex nature of modern phosphoproteomics research produces a',
  ' High volume of data. Chemical phosphoproteomics especially, is amenable to a variety',
  'Of analytical approaches. In this study we propose novel logic-based algorithms that',
];

const HowToNavigate = (): JSX.Element => {
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
