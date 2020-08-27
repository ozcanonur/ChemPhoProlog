import React from 'react';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TimelineIcon from '@material-ui/icons/Timeline';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
const useStyles = makeStyles(styles);

const SelectionList = ({ pathwayData, changeSelection }) => {
  const classes = useStyles();

  const { pathways, stoppingReasons } = pathwayData;

  return (
    <Card>
      <CardHeader color='warning'>
        <h4 className={classes.cardTitleWhite}>Select</h4>
        <p className={classes.cardCategoryWhite}>Select</p>
      </CardHeader>
      <CardBody style={{ maxHeight: '800px', overflow: 'auto' }}>
        <List>
          {pathways.map((path, key) => {
            const endNode = path[path.length - 1];
            const stopReason = stoppingReasons[endNode];
            const text = `${path.length} / ${endNode} / ${stopReason}`;
            return (
              <ListItem button key={key} onClick={() => changeSelection(key)}>
                <ListItemIcon>
                  <TimelineIcon />
                </ListItemIcon>
                <ListItemText primary={text} style={{ fontSize: 10 }} />
              </ListItem>
            );
          })}
        </List>
      </CardBody>
    </Card>
  );
};

export default SelectionList;
