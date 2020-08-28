import React, { useEffect, useState } from 'react';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Lottie from 'react-lottie';
import animationData from 'assets/lottie/loading2.json';

import Pathdetails from 'views/Pathway/PathDetails';
import PathsTable from 'views/Pathway/PathsTable';
import Pathway from 'views/Pathway/Pathway';
import PathSelectList from 'views/Pathway/PathSelectList';
import { CallApi, CallApiForPaths } from 'api/api';
import { getCytoStylesheet, getCytoLayout, getCytoElements } from 'views/Pathway/CytoscapeUtils/build';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle';

const useStyles = makeStyles(styles);

const formatObservation = (phosphosites, fullObservationData) => {
  const observationInCurrentPaths = fullObservationData.filter((e) => phosphosites.includes(e.substrate));

  const formattedObservation = {};
  // eslint-disable-next-line camelcase
  observationInCurrentPaths.forEach(({ substrate, fold_change, p_value }) => {
    formattedObservation[substrate] = {
      fold_change: fold_change.toFixed(2),
      p_value: p_value.toFixed(2),
    };
  });

  return formattedObservation;
};

export default () => {
  const classes = useStyles();

  const [data, setData] = useState({
    paths: [],
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
    Promise.all([CallApi(observationQuery), CallApiForPaths()]).then((results) => {
      const [fullObservationData, pathsResults] = results;
      const formattedObservation = formatObservation(pathsResults.phosphosites, fullObservationData);
      setData({ observation: formattedObservation, ...pathsResults });
    });
  }, []);

  const stylesheet = getCytoStylesheet(data.observation, data.regulatory);
  const layout = getCytoLayout();
  const elements = getCytoElements(data);

  const changeSelection = (ID) => {
    setSelectedPath(data.paths[ID]);
  };

  return (
    <div style={{ padding: '2em' }}>
      <GridContainer direction='column'>
        <GridItem>
          <GridContainer direction='row'>
            <GridItem xs={10}>
              <Card>
                <CardHeader color='warning'>
                  <h4 className={classes.cardTitleWhite}>Bottom up pathway</h4>
                  <p className={classes.cardCategoryWhite}> MCF-7 / Torin / AKT1(S473)</p>
                </CardHeader>
                <CardBody>
                  {elements.length !== 0 ? (
                    <Pathway
                      data={data}
                      stylesheet={stylesheet}
                      layout={layout}
                      elements={elements}
                      selectedPath={selectedPath}
                    />
                  ) : (
                    <Lottie options={{ loop: true, autoplay: true, animationData }} height={800} width={800} />
                  )}
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={2}>
              <PathSelectList data={data} changeSelection={changeSelection} />
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <GridContainer direction='row'>
            <GridItem md>
              <PathsTable data={data} />
            </GridItem>
            <GridItem md>
              <Pathdetails data={data} selectedPath={selectedPath} />
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
};
