import React, { useState, useEffect } from 'react';

import { ResponsiveHeatMap } from '@nivo/heatmap';

import { CallApi } from 'api/api';
import * as d3 from 'd3';

import { perturbagenNames } from './perturbagenNames';

const HeatMap = ({ data, indexBy, keys }) => (
  <ResponsiveHeatMap
    data={data}
    indexBy={indexBy}
    keys={keys}
    axisTop={{
      orient: 'top',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: -90,
    }}
    axisRight={null}
    axisBottom={null}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
    }}
    labelTextColor={{ from: 'color', modifiers: [['darker', 1.8]] }}
    animate={true}
    hoverTarget='cell'
    cellHoverOthersOpacity={0.25}
    enableLabels={false}
    margin={{ top: 80, right: 10, bottom: 10, left: 120 }}
    minValue={-16}
    maxValue={16}
    colors={d3.scaleSequential(d3.interpolatePiYG)}
    padding={3}
    nanColor={'rgb(235, 237, 240)'}
  />
);

const PhosphositesOfInterest = ({ location }) => {
  const [observationData, setObservationData] = useState([]);

  const protein = window.location.href.split('/')[4];

  useEffect(() => {
    let mounted = true;

    const substrate = `${protein}(${location.res}${location.loc})`;
    const query =
      `select perturbagen, cell_line, fold_change from observation ` +
      `where substrate="${substrate}" and fold_change > -888`;

    CallApi(query).then((res) => {
      if (mounted) {
        setObservationData(res.map(Object.values));
      }
    });

    return function cleanUp() {
      mounted = false;
    };
  }, [location, protein]);

  const createHeatmapObject = (cell_line, data) => {
    const filtered = data.filter((e) => e[1] === cell_line);

    let result = { cell_line: cell_line };
    for (const observation of filtered) {
      result[observation[0]] = observation[2];
    }

    return result;
  };

  const obsMCF = createHeatmapObject('MCF-7', observationData);
  const obsHL = createHeatmapObject('HL-60', observationData);
  const obsNTERA = createHeatmapObject('NTERA-2 clone D1', observationData);

  const heatmapData = [obsNTERA, obsHL, obsMCF];
  const keys = perturbagenNames;

  return (
    <div>
      {observationData.length === 0 ? (
        <div>No observation data for this site</div>
      ) : (
        <div style={{ height: '20em' }}>
          <HeatMap data={heatmapData} indexBy={'cell_line'} keys={keys} />
        </div>
      )}
    </div>
  );
};

export default PhosphositesOfInterest;
