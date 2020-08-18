import React, { useEffect, useState } from 'react';

import CytoscapeComponent from 'react-cytoscapejs';
import { CallApiForPathway } from 'api/api';

const Pathway = () => {
  const [pathwayData, setPathwayData] = useState({
    relations: {},
    leftOvers: [],
    regulatory: {},
    stoppingReasons: {},
  });

  useEffect(() => {
    CallApiForPathway().then((res) => {
      setPathwayData(res);
    });
  }, []);

  console.log(pathwayData);

  const elements = [
    { data: { id: 'one', label: 'Node 1' }, position: { x: 500, y: 100 } },
    { data: { id: 'two', label: 'Node 2' }, position: { x: 500, y: 500 } },
    { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } },
  ];

  return (
    <div style={{ border: '2px solid black', backgroundColor: 'white' }}>
      <CytoscapeComponent elements={elements} style={{ width: '6000px', height: '600px' }} />
    </div>
  );
};

export default Pathway;
