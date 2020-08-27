import React, { useEffect, useState } from 'react';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Lottie from 'react-lottie';
import animationData from 'assets/lottie/loading2.json';

import Pathway from 'views/Pathway/Pathway';
import SelectionList from 'views/Pathway/SelectionList';
import { CallApiForPathway } from 'api/api';
import { CallApi } from 'api/api';
import {
  getCytoStylesheet,
  getCytoLayout,
  getCytoElements,
} from 'views/Pathway/CytoscapeUtils/build';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
const useStyles = makeStyles(styles);

const formatObservation = (phosphosites, fullObservationData) => {
  const observationInCurrentPathway = fullObservationData.filter((e) =>
    phosphosites.includes(e.substrate)
  );

  const formattedObservation = {};
  observationInCurrentPathway.forEach(({ substrate, fold_change, p_value }) => {
    formattedObservation[substrate] = {
      fold_change: fold_change.toFixed(2),
      p_value: p_value.toFixed(2),
    };
  });
  return formattedObservation;
};

export default () => {
  const classes = useStyles();

  const [pathwayData, setPathwayData] = useState({
    pathways: [],
    relations: {},
    phosphosites: [],
    regulatory: {},
    stoppingReasons: {},
    observation: {},
  });

  const [selectedPath, setSelectedPath] = useState([]);

  useEffect(() => {
    const observationQuery =
      'select substrate, fold_change, p_value from observation where perturbagen="Torin" and cell_line="MCF-7"';
    Promise.all([CallApi(observationQuery), CallApiForPathway()]).then(
      (results) => {
        const pathwayResults = results[1];
        const phosphosites = pathwayResults.phosphosites;
        const formattedObservation = formatObservation(
          phosphosites,
          results[0]
        );
        setPathwayData({
          observation: formattedObservation,
          ...pathwayResults,
        });
      }
    );
  }, []);

  const stylesheet = getCytoStylesheet(
    pathwayData.observation,
    pathwayData.regulatory
  );
  const layout = getCytoLayout();
  const elements = getCytoElements(pathwayData);

  const changeSelection = (num) => {
    setSelectedPath(pathwayData.pathways[num]);
  };

  return (
    <div style={{ padding: '2em' }}>
      <GridContainer direction="row">
        <GridItem xs={10}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Bottom up pathway</h4>
              <p className={classes.cardCategoryWhite}>
                {' '}
                MCF-7 / Torin / AKT1(S473)
              </p>
            </CardHeader>
            <CardBody>
              {elements.length !== 0 ? (
                <Pathway
                  pathwayData={pathwayData}
                  stylesheet={stylesheet}
                  layout={layout}
                  elements={elements}
                  selectedPath={selectedPath}
                />
              ) : (
                <Lottie
                  options={{ loop: true, autoplay: true, animationData }}
                  height={500}
                  width={500}
                />
              )}
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={2}>
          <SelectionList
            pathwayData={pathwayData}
            changeSelection={changeSelection}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
};
