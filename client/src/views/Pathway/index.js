import React, { useEffect, useState } from 'react';

import Pathway from 'views/Pathway/Pathway';
import { CallApiForPathway } from 'api/api';
import { CallApi } from 'api/api';
import { cytoStylesheet, cytoLayout, cytoElements } from 'views/Pathway/utils/build';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import { Button, Input } from '@material-ui/core';

import Lottie from 'react-lottie';
import animationData from 'assets/lottie/loading2.json';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';

const useStyles = makeStyles(styles);

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
    Promise.all([CallApi(observationQuery), CallApiForPathway()]).then((results) => {
      const observationData = results[0].filter((e) =>
        results[1].phosphosites.includes(e.substrate)
      );

      const observation = {};
      observationData.forEach(({ substrate, fold_change, p_value }) => {
        observation[substrate] = {
          fold_change: fold_change.toFixed(2),
          p_value: p_value.toFixed(2),
        };
      });
      setPathwayData({ ...results[1], observation });
    });
  }, []);

  const stylesheet = cytoStylesheet();
  const layout = cytoLayout();
  const elements = cytoElements(pathwayData);

  const changeSelected = () => {
    setSelectedPath(pathwayData.pathways[8]);
  };

  return (
    <div style={{ padding: '2em' }}>
      <Card>
        <CardHeader color='warning' style={{ marginTop: '2em' }}>
          <h4 className={classes.cardTitleWhite}>Bottom up pathway</h4>
          <p className={classes.cardCategoryWhite}> MCF-7 / Torin / AKT1(S473)</p>
        </CardHeader>
        <CardBody style={{ position: 'relative' }}>
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
              options={{ loop: true, autoplay: true, animationData: animationData }}
              height={800}
              width={800}
            />
          )}
        </CardBody>
      </Card>
      <Input
        onChange={(e) => setSelectedPath(pathwayData.pathways[parseInt(e.target.value)])}></Input>
    </div>
  );
};
