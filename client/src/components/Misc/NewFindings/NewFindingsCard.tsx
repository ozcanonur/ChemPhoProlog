import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Warning from '@material-ui/icons/Warning';
import NewReleases from '@material-ui/icons/NewReleases';
import TrendingDown from '@material-ui/icons/TrendingDown';
import { ResponsivePie } from '@nivo/pie';

import GridItem from 'components/Misc/CustomGrid/GridItem';
import GridContainer from 'components/Misc/CustomGrid/GridContainer';
import Card from 'components/Misc/Card/Card';
import CardHeader from 'components/Misc/Card/CardHeader';
import CardIcon from 'components/Misc/Card/CardIcon';
import CardFooter from 'components/Misc/Card/CardFooter';

import newFindingsCardStyles from './styles';

const useStyles = makeStyles(newFindingsCardStyles);

interface Props {
  leftIconTitle: string;
  leftIconText: string;
  rightIconTitle: string;
  rightIconText: string;
}

const NewFindingsCard = ({ leftIconTitle, leftIconText, rightIconTitle, rightIconText }: Props) => {
  const classes = useStyles();

  const dataNewPerturbagens = [
    {
      id: 'New',
      label: 'New',
      value: 6,
    },
    {
      id: 'Known',
      label: 'Known',
      value: 24,
    },
  ];

  const dataNewSubstrates = [
    {
      id: 'New',
      label: 'New',
      value: 24,
    },
    {
      id: 'Known',
      label: 'Known',
      value: 14,
    },
  ];

  return (
    <GridContainer direction='column'>
      <GridItem md>
        <GridContainer direction='row' justify='space-evenly'>
          <GridItem xs={7}>
            <Card>
              <CardHeader color='warning' stats icon>
                <CardIcon color='warning'>
                  <NewReleases />
                </CardIcon>
                <p className={classes.cardCategory}>{leftIconTitle}</p>
                <h3 className={classes.cardTitle}>{leftIconText}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <div className={classes.statsIconContainer}>
                    <Warning />
                  </div>
                  Previously reported direct targets: 24
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={5}>
            <div style={{ height: '80%' }}>
              <ResponsivePie
                data={dataNewPerturbagens}
                margin={{ top: 0, right: 0, bottom: 0, left: 15 }}
                innerRadius={0.35}
                padAngle={2}
                colors={['rgba(255,193,7, 0.7)', 'rgba(45,65,89, 0.7)']}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                radialLabelsSkipAngle={10}
                radialLabelsTextXOffset={6}
                radialLabelsTextColor='#333333'
                radialLabelsLinkOffset={0}
                radialLabelsLinkDiagonalLength={10}
                radialLabelsLinkHorizontalLength={10}
                radialLabelsLinkStrokeWidth={1}
                radialLabelsLinkColor={{ from: 'color' }}
                slicesLabelsSkipAngle={10}
                slicesLabelsTextColor='#fff'
                animate
                motionStiffness={90}
                motionDamping={15}
              />
            </div>
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem md>
        <GridContainer direction='row'>
          <GridItem xs={7}>
            <Card>
              <CardHeader color='warning' stats icon>
                <CardIcon color='warning'>
                  <TrendingDown />
                </CardIcon>
                <p className={classes.cardCategory}>{rightIconTitle}</p>
                <h3 className={classes.cardTitle}>{rightIconText}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <div className={classes.statsIconContainer}>
                    <Warning />
                  </div>
                  Previously reported direct substrates: 14
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={5}>
            <div style={{ height: '80%' }}>
              <ResponsivePie
                data={dataNewSubstrates}
                margin={{ top: 0, right: 0, bottom: 0, left: 15 }}
                innerRadius={0.35}
                padAngle={2}
                colors={['rgba(255,193,7, 0.7)', 'rgba(45,65,89, 0.7)']}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                radialLabelsSkipAngle={10}
                radialLabelsTextXOffset={6}
                radialLabelsTextColor='#333333'
                radialLabelsLinkOffset={0}
                radialLabelsLinkDiagonalLength={10}
                radialLabelsLinkHorizontalLength={10}
                radialLabelsLinkStrokeWidth={1}
                radialLabelsLinkColor={{ from: 'color' }}
                slicesLabelsSkipAngle={10}
                slicesLabelsTextColor='#fff'
                animate
                motionStiffness={90}
                motionDamping={15}
              />
            </div>
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
};

export default NewFindingsCard;
