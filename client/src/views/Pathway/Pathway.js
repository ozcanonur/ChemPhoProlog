import React, { useEffect, useState } from 'react';

import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import COSEBilkent from 'cytoscape-cose-bilkent';

import { CallApiForPathway } from 'api/api';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
const useStyles = makeStyles(styles);

Cytoscape.use(COSEBilkent);

const buildCy = (pathwayData) => {
  const stylesheet = [
    {
      selector: 'node',
      style: {
        content: 'data(id)',
        fontFamily: 'Roboto',
      },
    },
    {
      selector: 'edge',
      style: {
        'curve-style': 'bezier',
        'source-arrow-shape': 'triangle',
        width: 4,
        'line-color': '#ddd',
        'source-arrow-color': 'red',
      },
    },
    {
      selector: '.phosphosite',
      style: {
        backgroundColor: 'orange',
        content: 'data(id)',
      },
    },
    {
      selector: '.KPa',
      style: {
        fontSize: 20,
      },
    },
    {
      selector: '.highlighted',
      style: {
        backgroundColor: 'green',
        'background-opacity': 0.2,
        lineColor: 'green',
        'transition-property': 'background-color',
        'transition-duration': '1s',
        lineStyle: 'dashed',
      },
    },
  ];

  const layout = {
    name: 'cose-bilkent',
    quality: 'default',
    randomize: false,
    // Whether to include labels in node dimensions. Useful for avoiding label overlap
    nodeDimensionsIncludeLabels: true,
    // number of ticks per frame; higher is faster but more jerky
    refresh: 60,
    // Node repulsion (non overlapping) multiplier
    nodeRepulsion: 20000,
    // Ideal (intra-graph) edge length
    idealEdgeLength: 50,
    // Divisor to compute edge forces
    edgeElasticity: 0.1,
    // Nesting factor (multiplier) to compute ideal edge length for inter-graph edges
    nestingFactor: 0.5,
    // Gravity force (constant)
    gravity: 0.25,
    // Maximum number of iterations to perform
    numIter: 2500,
    // Whether to tile disconnected nodes
    tile: true,
    // Type of layout animation. The option set is {'during', 'end', false}
    animate: false,
    // Duration for animate:end
    animationDuration: 500,
    // These paddings are space between nodes (phosphosites actually)
    tilingPaddingVertical: 5,
    tilingPaddingHorizontal: 5,
    // Gravity range (constant) for compounds
    gravityRangeCompound: 0.5,
    // Gravity force (constant) for compounds
    gravityCompound: 0.5,
    // Gravity range (constant)
    gravityRange: 10,
    // Initial cooling factor for incremental layout
    initialEnergyOnIncremental: 0.5,
  };

  // KPas
  const nodes = Object.keys(pathwayData.relations).map((e) => {
    return { data: { id: e }, classes: ['KPa'] };
  });

  const phosphosites = pathwayData.phosphosites.map((e) => {
    return { data: { id: e, parent: e.split('(')[0] }, classes: ['phosphosite'] };
  });

  // Avoiding loops with indexOf, messes up the layout for some reason?
  const edges = Object.keys(pathwayData.relations)
    .map((key) =>
      pathwayData.relations[key]
        .filter((x) => x.indexOf(key) === -1)
        .map((e) => {
          return { data: { id: `${key}to${e}`, source: key, target: e } };
        })
    )
    .flat();

  let elements = [...nodes, ...phosphosites, ...edges];

  return { stylesheet, layout, elements };
};

const Pathway = () => {
  const classes = useStyles();

  const [pathwayData, setPathwayData] = useState({
    pathways: [],
    relations: {},
    phosphosites: [],
    regulatory: {},
    stoppingReasons: {},
  });

  useEffect(() => {
    CallApiForPathway().then((res) => {
      setPathwayData(res);
    });
  }, []);

  const { stylesheet, layout, elements } = buildCy(pathwayData);

  const layoutRun = (cy) => {
    cy.on('resize', (_evt) => {
      cy.layout(layout).run();
      cy.fit();
    });
  };

  const animatePath = (cy, pathway) => {
    const getCollectionToAnimate = (path, cy) => {
      let pathwayIds = [];
      for (let i = 0; i < path.length; i++) {
        const currNode = path[i];
        if (i % 2 !== 0 || i === path.length - 1) {
          pathwayIds.push(`${currNode}to${path[i - 1]}`);
          pathwayIds.push(currNode);
        } else {
          pathwayIds.push(currNode);
        }
      }

      let collection = cy.elements().filter((e) => pathwayIds.includes(e.data().id));
      return collection.sort(
        (x, y) => pathwayIds.indexOf(x.data().id) - pathwayIds.indexOf(y.data().id)
      );
    };

    const pathToAnimate = getCollectionToAnimate(pathway, cy);
    let i = 0;
    const highlightNextEle = () => {
      if (i < pathToAnimate.length) {
        pathToAnimate[i].addClass('highlighted');

        i++;
        setTimeout(highlightNextEle, 1000);
      }
    };

    highlightNextEle();
  };

  // Additional tweaks
  const extras = (cy) => {
    layoutRun(cy);

    const examplePathway = pathwayData.pathways[0];
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
            <p>Loading..</p>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Pathway;
