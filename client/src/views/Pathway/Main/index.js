import React from 'react';
import { useSelector } from 'react-redux';
import { store } from 'store';

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import CardGeneric from 'components/Card/CardGeneric';

import ExtraButtons from 'views/Pathway/Main/Buttons/';
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

  const { cellLine, perturbagen, substrate } = store.getState().pathwayInputs;

  const elements = getCytoElements(data);
  const stylesheet = getCytoStylesheet(data.observation, data.regulatory, substrate);
  const layout = getCytoLayout();

  return (
    <GridContainer direction='row'>
      <GridItem xs={10}>
        <CardGeneric
          color='primary'
          cardTitle='Pathway'
          cardSubtitle={`${cellLine} / ${perturbagen} / ${substrate} `}
          style={{ height: '55rem' }}
        >
          <Pathway data={data} elements={elements} stylesheet={stylesheet} layout={layout} />
          <div style={{ position: 'absolute', top: 0, right: 0 }}>
            <ExtraButtons />
          </div>
        </CardGeneric>
      </GridItem>
      <GridItem xs={2}>
        <PathSelectList />
      </GridItem>
    </GridContainer>
  );
});

export default Main;
