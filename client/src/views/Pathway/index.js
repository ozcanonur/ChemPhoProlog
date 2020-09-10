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

  const stylesheet = getCytoStylesheet(data.observation, data.regulatory);
  const layout = getCytoLayout();
  const elements = getCytoElements(data);

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
                    {data.paths.length !== 0 ? (
                      <Pathway
                        data={data}
                        stylesheet={stylesheet}
                        layout={layout}
                        elements={elements}
                        selectedPath={selectedPath}
                      />
                    ) : (
                      'Select inputs'
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
