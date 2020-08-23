import React, { useEffect, useState } from 'react';

import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import COSEBilkent from 'cytoscape-cose-bilkent';
import popper from 'cytoscape-popper';

import { CallApiForPathway } from 'api/api';
import { CallApi } from 'api/api';
import { runLayout } from 'views/Pathway/CytoscapeUtil';
import { animatePath } from 'views/Pathway/CytoscapeAnimation';
import { cytoStylesheet, cytoLayout, cytoElements } from 'views/Pathway/CytoscapeBuild';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';

import Lottie from 'react-lottie';
import animationData from 'assets/lottie/loading2.json';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
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

  useEffect(() => {
    const observationQuery =
      'select substrate, fold_change, p_value from observation where perturbagen="Torin" and cell_line="MCF-7"';
    Promise.all([CallApi(observationQuery), CallApiForPathway()]).then((results) => {
      const observationData = results[0].filter((e) =>
        results[1].phosphosites.includes(e.substrate)
      );
      setPathwayData({ ...results[1], ...observationData });
    });

    return () => {
      for (var i = 0; i < 100000; i++) clearTimeout(i);
      for (const tooltip of document.getElementsByClassName('tippy-popper')) {
        tooltip.parentNode.removeChild(tooltip);
      }
    };
  }, []);

  const stylesheet = cytoStylesheet();
  const layout = cytoLayout();
  const elements = cytoElements(pathwayData);

  // Additional tweaks
  const extras = (cy) => {
    runLayout(cy, layout);

    const examplePathway = pathwayData.pathways[4];
    animatePath(cy, examplePathway);
  };

  return (
    <div style={{ padding: '2em' }}>
      <Card>
        <CardHeader color='warning' style={{ marginTop: '2em' }}>
          <h4 className={classes.cardTitleWhite}>Bottom up pathway</h4>
          <p className={classes.cardCategoryWhite}> MCF-7 / Torin / AKT1(S473)</p>
        </CardHeader>
        <CardBody>
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
    </div>
  );
};

export default Pathway;
