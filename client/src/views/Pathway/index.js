/* eslint-disable no-nested-ternary */
import React from 'react';
import { useSelector } from 'react-redux';
import { store } from 'store';

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

import PathwayInputs from 'views/Pathway/Inputs/index';
import PathExplanation from 'views/Pathway/Information/PathExplanation';
import PathsTable from 'views/Pathway/Information/PathsTable';
import Pathway from 'views/Pathway/Main/Pathway';
import PathSelectList from 'views/Pathway/Main/PathSelectList';

import { getCytoStylesheet, getCytoLayout, getCytoElements } from 'views/Pathway/utils/options';

// Wrapping it up in memo because react-router {match} causes re-render
// Problematic with cxtmenu > add to sidebar function
const PathwayIndex = React.memo(
  function PathwayIndex() {
    const data = useSelector((state) => state.pathwayData) || {
      paths: [],
      relations: {},
      phosphosites: [],
      regulatory: {},
      stoppingReasons: {},
      observation: {},
    };

    const start = store.getState().pathwayInputs.substrate;

    const elements = getCytoElements(data);
    const stylesheet = getCytoStylesheet(data.observation, data.regulatory, start);
    const layout = getCytoLayout();

    return (
      <div style={{ padding: '2em' }}>
        <GridContainer direction='column'>
          <GridItem>
            <PathwayInputs />
          </GridItem>
          <GridItem>
            <GridContainer direction='column'>
              <GridItem>
                <GridContainer direction='row'>
                  <GridItem xs={10}>
                    <Pathway data={data} elements={elements} stylesheet={stylesheet} layout={layout} />
                  </GridItem>
                  <GridItem xs={2}>
                    <PathSelectList />
                  </GridItem>
                </GridContainer>
              </GridItem>
              <GridItem>
                <GridContainer direction='row'>
                  <GridItem md>
                    <PathsTable />
                  </GridItem>
                  <GridItem md>
                    <PathExplanation />
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.match.path === nextProps.match.path
);

export default PathwayIndex;
