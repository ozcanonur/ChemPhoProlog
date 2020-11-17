/* eslint-disable react/no-array-index-key */
import React from 'react';
import CardGeneric from 'components/Misc/Card/CardGeneric';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Core } from 'cytoscape';

import { useSelector, useDispatch } from 'react-redux';
import { changeSelectedPath, setElementsToAnimate } from 'actions/pathways';
import { resetPathwayVisuals, clearAllTimeouts } from './utils/misc';
import { getElementsToAnimate, animatePath } from './utils/animation';

interface Props {
  cy: Core;
}

const PathSelectList = ({ cy }: Props) => {
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
    <CardGeneric
      color='primary'
      cardTitle='Inspect'
      cardSubtitle='And Animate!'
      bodyStyle={{ overflow: 'auto' }}
      style={{ maxHeight: '55rem' }}
    >
      <List>
        {pathsInspectList.map((path, key) => {
          const [id, node, stopReason] = path;
          const text = `${node}, ${stopReason}`;
          return (
            <ListItem button key={key} onClick={() => pathOnClick(id)}>
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
    </CardGeneric>
  );
};

export default PathSelectList;
