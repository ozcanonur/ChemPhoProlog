import React from 'react';
import { useSelector } from 'react-redux';
import { store } from 'store';

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

import Pathway from 'views/Pathway/Main/Pathway';
import PathSelectList from 'views/Pathway/Main/PathSelectList';

import { getCytoStylesheet, getCytoLayout, getCytoElements } from 'views/Pathway/utils/options';

// Wrapping it up in memo because react-router {match} causes re-render
// Problematic with cxtmenu > add to sidebar function
const Main = React.memo(() => {
  const data = useSelector((state) => state.pathwayData) || {
    paths: [],
    relations: {},
    phosphosites: [],
    regulatory: {},
    stoppingReasons: {},
    observation: {},
  };

  const start = store.getState().pathwayInputs.substrate;

  const elements = getCytoElements(data).elements;
  const stylesheet = getCytoStylesheet(data.observation, data.regulatory, start);
  const layout = getCytoLayout();
  const loops = getCytoElements(data).loops;

  return (
    <GridContainer direction='row'>
      <GridItem xs={10}>
        <Pathway data={data} elements={elements} stylesheet={stylesheet} layout={layout} loops={loops} />
      </GridItem>
      <GridItem xs={2}>
        <PathSelectList />
      </GridItem>
    </GridContainer>
  );
});

export default Main;
