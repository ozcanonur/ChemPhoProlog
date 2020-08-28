/* eslint-disable no-nested-ternary */
import React from 'react';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

import phosphatases from 'views/Pathway/variables/phosphatases';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle';

const useStyles = makeStyles(styles);

// Should only work for KPa endings for now
const getExplanation = (pathwayData, path) => {
  const { observation, regulatory } = pathwayData;

  const outputList = [];
  let prevBottomKPaActivity = 'inhibited';
  for (let i = 0; i < path.length; i += 2) {
    const topKPa = path[i];
    const midPhosphosite = path[i + 1];
    const bottomKPa = path[i + 2];

    const topKPaActivity = prevBottomKPaActivity;
    const topKPaFunction = phosphatases.includes(topKPa) ? 'dephosphorylates' : 'phosphorylates';

    const foldChange = observation[midPhosphosite].fold_change;
    const reg = regulatory[midPhosphosite];

    const bottomKPaActivated = (foldChange > 0 && reg === 'p_inc') || (foldChange < 0 && reg === 'p_dec');
    const bottomKPaInhibited = (foldChange > 0 && reg === 'p_dec') || (foldChange < 0 && reg === 'p_inc');
    const bottomKPaActivity = bottomKPaActivated ? 'activated' : bottomKPaInhibited ? 'inhibited' : 'conflicting';

    const topKPaOutput = `${topKPa} is ${topKPaActivity}, (${topKPaFunction})`;
    const midPhosphositeOutput = `${midPhosphosite}, fc: ${foldChange}, reg: ${reg}`;
    const bottomKPaOutput = `${bottomKPa} is ${bottomKPaActivity}`;

    const isEnd = i === path.length - 2;

    const output = isEnd
      ? [topKPaOutput, midPhosphositeOutput, '']
      : [topKPaOutput, midPhosphositeOutput, bottomKPaOutput];

    outputList.push(output);

    prevBottomKPaActivity = bottomKPaActivity;
  }
  return outputList;
};

const PathDetails = ({ pathwayData, selectedPath }) => {
  const classes = useStyles();

  // DUSP4 MAPK3(T202) MAPK3 CDC25A(S18) CDC25A CDK2(Y15) CDK2 CDK2(T160) CDK2 CDK7(T170) CDK7 CDK1(T161) CDK1 PPP1CA(T320) PPP1CA AKT1(S473)

  const reversedPath = selectedPath.slice().reverse();
  const explanation = getExplanation(pathwayData, reversedPath);

  const StartExplanation = () => <div>{`Torin inhibits ${reversedPath[0]}`}</div>;

  return (
    <Card>
      <CardHeader color='info'>
        <h4 className={classes.cardTitleWhite}>Explanation</h4>
        <p className={classes.cardCategoryWhite}> MCF-7 / Torin / AKT1(S473)</p>
      </CardHeader>
      <CardBody>
        <GridContainer direction='column'>
          <GridItem style={{ marginTop: 15, marginBottom: 22 }}>
            <StartExplanation />
          </GridItem>
          {explanation.map((triplet, key) => (
            <GridItem key={key}>
              <GridContainer direction='row'>
                {triplet.map((e, key) => (
                  <GridItem md key={key}>
                    {e}
                  </GridItem>
                ))}
              </GridContainer>
            </GridItem>
          ))}
        </GridContainer>
      </CardBody>
    </Card>
  );
};

export default PathDetails;
