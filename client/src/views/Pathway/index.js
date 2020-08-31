import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import getPathwayData from 'actions/Pathway/getPathwayData';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Lottie from 'react-lottie';
import animationData from 'assets/lottie/loading2.json';

import PathDetails from 'views/Pathway/PathDetails';
import PathsTable from 'views/Pathway/PathsTable';
import Pathway from 'views/Pathway/Pathway';
import PathSelectList from 'views/Pathway/PathSelectList';
import { getCytoStylesheet, getCytoLayout, getCytoElements } from 'views/Pathway/CytoscapeUtils/options';

import makeStyles from '@material-ui/core/styles/makeStyles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle';

const useStyles = makeStyles(styles);

const PathwayIndex = () => {
  const classes = useStyles();

  const data = useSelector((state) => state.pathwayData);
  const selectedPath = useSelector((state) => state.selectedPath);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPathwayData('Torin', 'MCF-7'));
  }, [dispatch]);

  const stylesheet = getCytoStylesheet(data.observation, data.regulatory);
  const layout = getCytoLayout();
  const elements = getCytoElements(data);

  return (
    <div style={{ padding: '2em' }}>
      <GridContainer direction='column'>
        <GridItem>
          <GridContainer direction='row'>
            <GridItem xs={10}>
              <Card>
                <CardHeader color='primary'>
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
    </div>
  );
};

export default PathwayIndex;
