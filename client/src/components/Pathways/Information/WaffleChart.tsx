import React from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';

import CardGeneric from 'components/Misc/Card/CardGeneric';
import { ResponsiveWaffle } from '@nivo/waffle';

import informationStyles from './styles';

const useStyles = makeStyles(informationStyles);

const waffleColors = ['#2D4159', '#00acc1', '#B55560', '#e5ad06', '#4F0EAB', '#001233', '#ffbac2'];

const WaffleLegend = () => {
  const classes = useStyles();

  const legendItemNames = [
    'no_data',
    'no_prior_knowledge',
    'loop',
    'unexpectedFC',
    'known_inhibitor',
    'double_auto_phosphorylation',
  ];

  const legendItems = legendItemNames.map((name, index) => {
    return {
      name,
      color: waffleColors[index],
    };
  });

  return (
    <div className={classes.legendContainer}>
      {legendItems.map(({ name, color }) => (
        <div key={name} className={classes.legendItem}>
          <div className={classes.legendIcon} style={{ backgroundColor: color }} />
          <div>{name}</div>
        </div>
      ))}
    </div>
  );
};

const Waffle = () => {
  const classes = useStyles();

  const { cellLine, perturbagen, substrate } = useSelector((state: RootState) => state.pathwayInputs);

  const data = useSelector((state: RootState) => state.pathwayData);

  const { paths, stoppingReasons } = data;

  const stoppingReasonCounts: { [key: string]: number } = {
    no_data: 0,
    unaffected: 0,
    no_prior_knowledge: 0,
    loop: 0,
    unexpectedFC: 0,
    known_inhibitor: 0,
    double_auto_phosphorylation: 0,
  };

  paths.forEach((path) => {
    const endNode = path[path.length - 1];
    const stopReason = stoppingReasons[endNode];
    stoppingReasonCounts[stopReason] += 1;
  });

  let totalCount = 0;
  const waffleData = Object.keys(stoppingReasonCounts).map((key) => {
    totalCount += stoppingReasonCounts[key];
    return { id: key, label: key, value: stoppingReasonCounts[key] };
  });

  return (
    <CardGeneric
      color='primary'
      cardTitle='Stopping reasons'
      cardSubtitle={`${cellLine} / ${perturbagen} / ${substrate}`}
      className={classes.waffleCard}
    >
      <div className={classes.waffleContainer}>
        <WaffleLegend />
        <ResponsiveWaffle
          data={waffleData}
          total={totalCount}
          rows={6}
          columns={50}
          fillDirection='left'
          margin={{ top: 50, right: 0, bottom: 0, left: 0 }}
          colors={waffleColors}
          borderColor={{ from: 'color', modifiers: [['darker', 0.6]] }}
          animate={false}
        />
      </div>
    </CardGeneric>
  );
};

export default Waffle;
