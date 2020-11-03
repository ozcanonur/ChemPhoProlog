/* eslint-disable react/no-array-index-key */
import React from 'react';
import CardGeneric from 'components/Misc/Card/CardGeneric';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { useSelector, useDispatch } from 'react-redux';
import { changeSelectedPath, setElementsToAnimate } from 'actions/pathways';
import { resetPathwayVisuals, clearAllTimeouts } from 'components/Pathways/utils/misc';
import { getElementsToAnimate, animatePath } from 'components/Pathways/utils/animation';
import { Core } from 'cytoscape';

interface Props {
  cy: Core;
}

const PathSelectList = ({ cy }: Props): JSX.Element => {
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
      bodyStyle={{ maxHeight: '70vh', overflow: 'auto' }}
    >
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
    </CardGeneric>
  );
};

export default PathSelectList;
