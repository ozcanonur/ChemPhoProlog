import React from 'react';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { useSelector, useDispatch } from 'react-redux';
import changeSelectedPath from 'actions/Pathway/changeSelectedPath';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle';

const useStyles = makeStyles(styles);

const PathSelectList = () => {
  const classes = useStyles();

  const data = useSelector((state) => state.pathwayData);
  const pathsInspectList = useSelector((state) => state.pathsInspectList);

  const dispatch = useDispatch();

  const pathOnClick = (id) => {
    dispatch(changeSelectedPath(data.paths[id]));
  };

  return (
    <Card>
      <CardHeader color='warning'>
        <h4 className={classes.cardTitleWhite}>Inpsect</h4>
        <p className={classes.cardCategoryWhite}>And Animate!</p>
      </CardHeader>
      <CardBody style={{ maxHeight: '800px', overflow: 'auto' }}>
        <List>
          {pathsInspectList.map((e, key) => {
            const [id, node, stopReason, length] = e;
            const text = `${id} / ${node} / ${stopReason} / ${length}`;
            return (
              <ListItem button key={key} onClick={() => pathOnClick(id)}>
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
      </CardBody>
    </Card>
  );
};

export default PathSelectList;
