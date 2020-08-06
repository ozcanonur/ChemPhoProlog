import React, { useRef } from 'react';
import * as d3 from 'd3';

const CircularBarPlot = ({ data }) => {
  const chart = useRef();

  function square(x) {
    return x * x;
  }

  function radial() {
    var linear = d3.scaleLinear();

    function scale(x) {
      return Math.sqrt(linear(x));
    }

    scale.domain = function (_) {
      return arguments.length ? (linear.domain(_), scale) : linear.domain();
    };

    scale.nice = function (count) {
      return linear.nice(count), scale;
    };

    scale.range = function (_) {
      return arguments.length
        ? (linear.range(_.map(square)), scale)
        : linear.range().map(Math.sqrt);
    };

    scale.ticks = linear.ticks;
    scale.tickFormat = linear.tickFormat;

    return scale;
  }

  // set the dimensions and margins of the graph
  var margin = { top: 100, right: 0, bottom: 0, left: 0 },
    width = 460 - margin.left - margin.right,
    height = 460 - margin.top - margin.bottom,
    innerRadius = 90,
    outerRadius = Math.min(width, height) / 2;

  // append the svg object
  var svg = d3
    .select(chart.current)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr(
      'transform',
      'translate(' + (width / 2 + margin.left) + ',' + (height / 2 + margin.top) + ')'
    );

  // Scales
  var x = d3
    .scaleBand()
    .range([0, 2 * Math.PI])
    .align(0)
    .domain(
      data.map(function (d) {
        return d.Kinase;
      })
    );

  const maxValue = Math.max.apply(
    Math,
    data.map((e) => e.Count)
  );

  var y = radial().range([innerRadius, outerRadius]).domain([0, maxValue]);

  // Add the bars
  svg
    .append('g')
    .selectAll('path')
    .data(data)
    .enter()
    .append('path')
    .attr('fill', '#00acc1')
    .attr(
      'd',
      d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(function (d) {
          return y(d['Count']);
        })
        .startAngle(function (d) {
          return x(d.Kinase);
        })
        .endAngle(function (d) {
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
    .attr('text-anchor', function (d) {
      return (x(d.Kinase) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI
        ? 'end'
        : 'start';
    })
    .attr('transform', function (d) {
      return (
        'rotate(' +
        (((x(d.Kinase) + x.bandwidth() / 2) * 180) / Math.PI - 90) +
        ')' +
        'translate(' +
        (y(d['Count']) + 10) +
        ',0)'
      );
    })
    .append('text')
    .text(function (d) {
      return d.Kinase;
    })
    .attr('transform', function (d) {
      return (x(d.Kinase) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI
        ? 'rotate(180)'
        : 'rotate(0)';
    })
    .style('font-size', '11px')
    .attr('alignment-baseline', 'middle');

  return <div style={{ textAlign: 'center' }} ref={chart}></div>;
};

export default CircularBarPlot;
