// @ts-nocheck
/* eslint-disable func-names */
/* eslint-disable prefer-spread */
import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';

import { fetchFromApi } from 'utils/api';
import CardGeneric from 'components/Misc/Card/CardGeneric';
import { getChartData } from './helpers';

interface Props {
  cellLine: string;
}

interface PDT {
  confidence: string;
  shared_with: string;
  substrate: string;
  uniprot_name: string;
}

const CircularBarPlot = ({ cellLine }: Props) => {
  const [PDTs, setPDTs] = useState<PDT[]>([]);

  const kinase = window.location.href.split('/')[3];

  useEffect(() => {
    let mounted = true;

    fetchFromApi('/api/pdts', { kinase, cell_line: cellLine }).then((res) => {
      if (mounted && res) setPDTs(res);
    });

    return () => {
      mounted = false;
    };
  }, [kinase, cellLine]);

  const data = getChartData(PDTs);

  const chart = useRef<HTMLDivElement>(null);

  function square(x: number) {
    return x * x;
  }

  function radial() {
    const linear = d3.scaleLinear();

    function scale(x) {
      return Math.sqrt(linear(x));
    }

    scale.domain = function (_) {
      return arguments.length ? (linear.domain(_), scale) : linear.domain();
    };

    scale.nice = function (count) {
      // eslint-disable-next-line no-sequences
      return linear.nice(count), scale;
    };

    scale.range = function (_) {
      return arguments.length ? (linear.range(_.map(square)), scale) : linear.range().map(Math.sqrt);
    };

    scale.ticks = linear.ticks;
    scale.tickFormat = linear.tickFormat;

    return scale;
  }

  // set the dimensions and margins of the graph
  const margin = { top: 100, right: 0, bottom: 0, left: 0 };
  const width = 320 - margin.left - margin.right;
  const height = 350 - margin.top - margin.bottom;
  const innerRadius = 70;
  const outerRadius = Math.min(width, height + 100) / 2;

  // append the svg object
  const svg = d3
    .select(chart.current)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${width / 2 + margin.left},${height / 2 + margin.top})`);

  // Scales
  const x = d3
    .scaleBand()
    .range([0, 2 * Math.PI])
    .align(0)
    .domain(
      data.map((d) => {
        return d.Kinase;
      })
    );

  const maxValue = Math.max.apply(
    Math,
    data.map((e) => e.Count)
  );

  const y = radial().range([innerRadius, outerRadius]).domain([0, maxValue]);

  // Add the bars
  svg
    .append('g')
    .selectAll('path')
    .data(data)
    .enter()
    .append('path')
    .attr('fill', 'rgba(45,65,89, 1)')
    .attr(
      'd',
      d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius((d) => {
          return y(d.Count);
        })
        .startAngle((d) => {
          return x(d.Kinase);
        })
        .endAngle((d) => {
          return x(d.Kinase) + x.bandwidth();
        })
        .padAngle(0.01)
        .padRadius(innerRadius)
    );

  // Add the labels
  svg
    .append('g')
    .selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .attr('text-anchor', (d) => {
      return (x(d.Kinase) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? 'end' : 'start';
    })
    .attr('transform', (d) => {
      return `rotate(${((x(d.Kinase) + x.bandwidth() / 2) * 180) / Math.PI - 90})translate(${y(d.Count) + 10},0)`;
    })
    .append('text')
    .text((d) => {
      return d.Kinase;
    })
    .attr('transform', (d) => {
      return (x(d.Kinase) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? 'rotate(180)' : 'rotate(0)';
    })
    .style('font-size', '11px')
    .attr('alignment-baseline', 'middle');

  return (
    <CardGeneric
      color='primary'
      cardTitle={`PDT Commonality in ${cellLine}`}
      cardSubtitle={`Between ${kinase} and other kinases`}
    >
      <div>{data.length === 0 ? 'No entries found.' : null}</div>
      <div style={{ textAlign: 'center' }} ref={chart} />
    </CardGeneric>
  );
};

export default CircularBarPlot;
