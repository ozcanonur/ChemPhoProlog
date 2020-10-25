import React from 'react';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { useSelector, useDispatch } from 'react-redux';
import { changeSelectedPath, setElementsToAnimate } from 'actions/pathways';
import {
  resetPathwayVisuals,
  clearAllTimeouts,
} from 'views/Pathway/utils/misc';
import {
  getElementsToAnimate,
  animatePath,
} from 'views/Pathway/utils/animation';

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
  cardCategoryWhite: {
    color: `rgba(255,255,255,.62)`,
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
});

const PathSelectList = () => {
  const classes = useStyles();

  const data = useSelector((state) => state.pathwayData);
  const pathsInspectList = useSelector((state) => state.pathsInspectList);
  const cy = useSelector((state) => state.cy);

  const dispatch = useDispatch();
  const pathOnClick = (id) => {
    const selectedPath = data.paths[id];
    dispatch(changeSelectedPath(selectedPath));

    const elementsToAnimate = getElementsToAnimate(cy, selectedPath);
    dispatch(setElementsToAnimate(elementsToAnimate));

    resetPathwayVisuals(cy);
    clearAllTimeouts();
    animatePath(elementsToAnimate, data, 50, true, true, dispatch);
  };

  return (
    <Card>
      <CardHeader color='primary'>
        <h4 className={classes.cardTitleWhite}>Inpsect</h4>
        <p className={classes.cardCategoryWhite}>And Animate!</p>
      </CardHeader>
      <CardBody style={{ maxHeight: '70vh', overflow: 'auto' }}>
        <List>
          {pathsInspectList.map((path, key) => {
            const [id, node, stopReason, length] = path;
            const text = `${node} / ${stopReason} / ${length}`;
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
