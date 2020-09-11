import React from 'react';
import { useSelector } from 'react-redux';

import CardGeneric from 'components/Card/CardGeneric';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

import PathwayInputs from 'views/Pathway/PathwayInputs';
import PathDetails from 'views/Pathway/PathDetails';
import PathsTable from 'views/Pathway/PathsTable';
import Pathway from 'views/Pathway/Pathway';
import PathSelectList from 'views/Pathway/PathSelectList';
import { getCytoStylesheet, getCytoLayout, getCytoElements } from 'views/Pathway/CytoscapeUtils/options';

const PathwayIndex = () => {
  const data = useSelector((state) => state.pathwayData);
  const selectedPath = useSelector((state) => state.selectedPath);

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
                  <CardGeneric
                    color='primary'
                    cardTitle='Bottom up Pathway'
                    cardSubtitle='MCF-7 / Torin / AKT1(S473)'
                  >
                    {data === null ? (
                      'Select inputs'
                    ) : data.paths.length === 0 ? (
                      'No paths found'
                    ) : (
                      <Pathway
                        data={data}
                        stylesheet={getCytoStylesheet(data.observation, data.regulatory)}
                        layout={getCytoLayout()}
                        elements={getCytoElements(data)}
                        selectedPath={selectedPath}
                      />
                    )}
                  </CardGeneric>
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
