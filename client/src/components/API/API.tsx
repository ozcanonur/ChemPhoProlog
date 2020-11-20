import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import GridContainer from 'components/Misc/CustomGrid/GridContainer';
import GridItem from 'components/Misc/CustomGrid/GridItem';
import typography from 'variables/apiTexts';
import APICard from './APICard';

const useStyles = makeStyles({
  container: {
    padding: '2rem',
  },
  bottomContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr',
    gridGap: '1rem 2rem',
  },
});

const API = () => {
  const classes = useStyles();

  const [pathway, observation, phosphosites, knownSubstrates, PDTs, knownPerturbagens, knownTargets] = typography;

  return (
    <div className={classes.container}>
      <GridContainer direction='column'>
        <GridItem>
          <APICard content={pathway} />
        </GridItem>
        <GridItem>
          <div className={classes.bottomContainer}>
            <APICard content={observation} />
            <APICard content={phosphosites} />
            <APICard content={knownSubstrates} />
            <APICard content={PDTs} />
            <APICard content={knownPerturbagens} />
            <APICard content={knownTargets} />
          </div>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default API;
