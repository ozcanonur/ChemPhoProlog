import React from 'react';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle';

const useStyles = makeStyles(styles);

const SelectionList = ({ changeSelection }) => {
  const classes = useStyles();

  const pathwaySelectList = useSelector((state) => state.pathwaySelectList);

  return (
    <Card>
      <CardHeader color='warning'>
        <h4 className={classes.cardTitleWhite}>Inpsect</h4>
        <p className={classes.cardCategoryWhite}>And Animate!</p>
      </CardHeader>
      <CardBody style={{ maxHeight: '800px', overflow: 'auto' }}>
        <List>
          {pathwaySelectList.map((e, key) => {
            const [ID, node, stopReason, length] = e;
            const text = `${ID} / ${node} / ${stopReason} / ${length}`;
            return (
              <ListItem button key={key} onClick={() => changeSelection(ID)}>
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
      </CardBody>
    </Card>
  );
};

export default SelectionList;
