import React, { useEffect, useState } from 'react';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TimelineIcon from '@material-ui/icons/Timeline';
import Lottie from 'react-lottie';
import animationData from 'assets/lottie/loading2.json';

import Pathway from 'views/Pathway/Pathway';
import { CallApiForPathway } from 'api/api';
import { CallApi } from 'api/api';
import { cytoStylesheet, cytoLayout, cytoElements } from 'views/Pathway/utils/build';

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
  console.log(pathwayData);
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

  const stylesheet = cytoStylesheet(pathwayData.observation, pathwayData.regulatory);
  const layout = cytoLayout();
  const elements = cytoElements(pathwayData);

  const changeSelection = (num) => {
    setSelectedPath(pathwayData.pathways[num]);
  };

  const SelectionList = () => {
    const list = pathwayData.pathways.map((path, key) => {
      const endNode = path[path.length - 1];
      const stopReason = pathwayData.stoppingReasons[endNode];
      return (
        <ListItem button key={key} onClick={() => changeSelection(key)}>
          <ListItemIcon>
            <TimelineIcon />
          </ListItemIcon>
          <ListItemText
            primary={`${path.length} / ${endNode} / ${stopReason}`}
            style={{ fontSize: 10 }}
          />
        </ListItem>
      );
    });

    return list;
  };

  return (
    <div style={{ padding: '2em' }}>
      <GridContainer direction='row'>
        <GridItem xs={10}>
          <Card>
            <CardHeader color='warning'>
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
                  height={500}
                  width={500}
                />
              )}
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={2}>
          <Card>
            <CardHeader color='warning'>
              <h4 className={classes.cardTitleWhite}>Select</h4>
              <p className={classes.cardCategoryWhite}>Select</p>
            </CardHeader>
            <CardBody style={{ maxHeight: '800px', overflow: 'auto' }}>
              <List>
                <SelectionList />
              </List>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};
