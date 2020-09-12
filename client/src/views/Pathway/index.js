/* eslint-disable no-nested-ternary */
import React from 'react';
import { useSelector } from 'react-redux';
import { store } from 'store';

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

import PathwayInputs from 'views/Pathway/PathwayInputs/index';
import PathDetails from 'views/Pathway/PathwayDetails/PathDetails';
import PathsTable from 'views/Pathway/PathwayDetails/PathsTable';
import Pathway from 'views/Pathway/PathwayMain/Pathway';
import PathSelectList from 'views/Pathway/PathwayMain/PathSelectList';

import { getCytoStylesheet, getCytoLayout, getCytoElements } from 'views/Pathway/CytoscapeUtils/options';

const PathwayIndex = () => {
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
                  <PathDetails />
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default PathwayIndex;
