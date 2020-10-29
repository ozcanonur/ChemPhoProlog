import React from 'react';
import { useSelector } from 'react-redux';
import { store } from 'index';

import GridContainer from 'freshComponents/Misc/CustomGrid/GridContainer';
import GridItem from 'freshComponents/Misc/CustomGrid/GridItem';

import Pathway from 'views/Pathway/Main/Pathway';
import PathSelectList from 'views/Pathway/Main/PathSelectList';

import {
  getCytoStylesheet,
  getCytoLayout,
  getCytoElements,
} from 'views/Pathway/utils/options';

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

  console.log(data);
  // const start = useSelector((state)=>state.pathwayInputs);
  const start = store.getState().pathwayInputs.substrate;

  const elements = getCytoElements(data);
  const stylesheet = getCytoStylesheet(
    data.observation,
    data.regulatory,
    start
  );
  const layout = getCytoLayout();

  return (
    <GridContainer direction='row'>
      <GridItem xs={10}>
        <Pathway
          data={data}
          elements={elements}
          stylesheet={stylesheet}
          layout={layout}
        />
      </GridItem>
      <GridItem xs={2}>
        <PathSelectList />
      </GridItem>
    </GridContainer>
  );
});

export default Main;
