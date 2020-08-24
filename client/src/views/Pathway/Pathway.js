import React, { useEffect, useState } from 'react';

import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import COSEBilkent from 'cytoscape-cose-bilkent';
import popper from 'cytoscape-popper';

import { CallApiForPathway } from 'api/api';
import { CallApi } from 'api/api';
import { runLayout } from 'views/Pathway/util';
import { animatePath } from 'views/Pathway/animation';
import { cytoStylesheet, cytoLayout, cytoElements } from 'views/Pathway/build';
import { hideAll as hideTooltips } from 'tippy.js';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import Button from 'components/CustomButtons/Button';

import Lottie from 'react-lottie';
import animationData from 'assets/lottie/loading2.json';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

const useStyles = makeStyles(styles);

Cytoscape.use(COSEBilkent);
Cytoscape.use(popper);

const Pathway = () => {
  const classes = useStyles();

  const [pathwayData, setPathwayData] = useState({
    pathways: [],
    relations: {},
    phosphosites: [],
    regulatory: {},
    stoppingReasons: {},
    observation: {},
  });

  const cleanAllTimeouts = () => {
    for (var i = 0; i < 100000; i++) clearTimeout(i);
  };

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

    return () => {
      // Cleanup animation timeouts
      cleanAllTimeouts();
      // Clear tooltips
      hideTooltips();
    };
  }, []);

  const stylesheet = cytoStylesheet();
  const layout = cytoLayout();
  const elements = cytoElements(pathwayData);

  let cyCore = null;
  let collectionToFade = [];
  const examplePathway = pathwayData.pathways[8];

  const toggleFadeCollection = (collection) => {
    collection.toggleClass('fade');
  };

  const toggleTooltips = () => {
    if (document.getElementsByClassName('tippy-popper').length !== 0) hideTooltips();
    else {
      const collections = animatePath(
        cyCore,
        examplePathway,
        pathwayData.regulatory,
        pathwayData.stoppingReasons,
        pathwayData.observation,
        0
      );

      collectionToFade = collections.fadeCollection;
    }
  };

  // Additional tweaks
  const extras = (cy) => {
    cyCore = cy;
    runLayout(cy, layout);

    const collections = animatePath(
      cy,
      examplePathway,
      pathwayData.regulatory,
      pathwayData.stoppingReasons,
      pathwayData.observation,
      200
    );

    collectionToFade = collections.fadeCollection;
  };

  return (
    <div style={{ padding: '2em', position: 'relative' }}>
      <Card>
        <CardHeader color='warning' style={{ marginTop: '2em' }}>
          <h4 className={classes.cardTitleWhite}>Bottom up pathway</h4>
          <p className={classes.cardCategoryWhite}> MCF-7 / Torin / AKT1(S473)</p>
        </CardHeader>
        <CardBody style={{ position: 'relative' }}>
          {elements.length !== 0 ? (
            <CytoscapeComponent
              cy={(cy) => extras(cy)}
              elements={elements}
              style={{ height: '800px' }}
              stylesheet={stylesheet}
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
      <GridContainer direction='column' style={{ position: 'absolute', bottom: 75, left: 50 }}>
        <GridItem md>
          <Button
            onClick={() => toggleFadeCollection(collectionToFade)}
            color={'warning'}
            style={{ width: '100%' }}>
            Fade Nodes
          </Button>
        </GridItem>
        <GridItem md>
          <Button
            onClick={() => {
              cleanAllTimeouts();
              toggleTooltips();
            }}
            color={'warning'}
            style={{ width: '100%' }}>
            Fade Tooltips
          </Button>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default Pathway;
