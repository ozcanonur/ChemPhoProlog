import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import cytoscape from 'cytoscape';
import GridContainer from 'components/Misc/CustomGrid/GridContainer';
import GridItem from 'components/Misc/CustomGrid/GridItem';
import PathwayInputs from './Inputs/Inputs';
import Pathway from './Pathway';
import PathInspectList from './PathInspectList';
import PathsTable from './Information/PathsTable';
import PathExplanationTable from './Information/PathExplanation';
import WaffleChart from './Information/WaffleChart';

const useStyles = makeStyles({
  container: {
    padding: '2em',
  },
  pathwayContainer: {
    display: 'flex',
    maxWidth: '100%',
  },
  pathwayInputsContainer: {
    position: 'relative',
  },
});

const PathwayIndex = () => {
  const classes = useStyles();

  // Ideally kept in redux store but Cytoscape object is too big
  // Crashes redux-devtools
  const [cy, setCy] = useState(cytoscape());

  return (
    <div className={classes.container}>
      <div className={classes.pathwayInputsContainer}>
        <PathwayInputs cy={cy} />
      </div>
      <div className={classes.pathwayContainer}>
        <Pathway cy={cy} setCy={setCy} />
        <PathInspectList cy={cy} />
      </div>
      <div>
        <GridContainer direction='row'>
          <GridItem xs={12} lg={6}>
            <PathsTable />
            <WaffleChart />
          </GridItem>
          <GridItem xs={12} lg={6}>
            <PathExplanationTable />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

export default React.memo(PathwayIndex, () => true);
