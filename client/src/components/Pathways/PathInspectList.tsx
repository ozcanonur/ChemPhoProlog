/* eslint-disable react/no-array-index-key */
import React from 'react';
import CardGeneric from 'components/Misc/Card/CardGeneric';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Core } from 'cytoscape';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { useSelector, useDispatch } from 'react-redux';
import { changeSelectedPath, setElementsToAnimate } from 'actions/pathways';
import { resetPathwayVisuals, clearAllTimeouts } from './utils/misc';
import { getElementsToAnimate, animatePath } from './utils/animation';

const useStyles = makeStyles({
  container: {
    maxWidth: '15%',
    marginLeft: '2rem',
  },
  card: {
    height: '100%',
    maxHeight: '50rem',
  },
});

interface Props {
  cy: Core;
}

const PathInspectList = ({ cy }: Props) => {
  const classes = useStyles();

  const data = useSelector((state: RootState) => state.pathwayData);
  const pathsInspectList = useSelector((state: RootState) => state.pathsInspectList);

  const dispatch = useDispatch();

  const pathOnClick = (id: string) => {
    const selectedPath = data.paths[parseInt(id, 10)];
    dispatch(changeSelectedPath(selectedPath));

    const elementsToAnimate = getElementsToAnimate(cy, selectedPath);
    if (!elementsToAnimate) return;
    dispatch(setElementsToAnimate(elementsToAnimate));

    resetPathwayVisuals(cy);
    clearAllTimeouts();
    animatePath(elementsToAnimate, data, 50, true, true);
  };

  return (
    <>
      {pathsInspectList.length > 0 ? (
        <div className={classes.container}>
          <CardGeneric
            color='primary'
            cardTitle='Inspect'
            cardSubtitle='And Animate!'
            bodyStyle={{ overflow: 'auto' }}
            className={classes.card}
          >
            <List>
              {pathsInspectList.map((path, key) => {
                const [id, node] = path;
                const text = `${node}`;
                // const text = `${node}, ${stopReason}`;
                return (
                  <ListItem button key={key} onClick={() => pathOnClick(id)}>
                    <ListItemText primary={text} />
                  </ListItem>
                );
              })}
            </List>
          </CardGeneric>
        </div>
      ) : null}
    </>
  );
};

export default PathInspectList;
